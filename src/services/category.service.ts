import {
  CategoryCreateDto,
  CategoryDeleteDto,
  CategoryDetailDto,
  CategoryListRequestDto,
  CategoryListResponseDto,
  CategoryUpdateDto,
} from '@dto';
import { CategoryEntity } from '@entities';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryEntity)
    private readonly categoryModel: typeof CategoryEntity,
  ) {}

  async createCategory(params: CategoryCreateDto): Promise<CategoryEntity> {
    console.log('🚀 ~ CategoryService ~ createCategory ~ params:', params);
    const existingCategory = await this.categoryModel.findOne({
      where: { name: params.name },
    });
    if (existingCategory)
      throw new ConflictException(
        `Danh mục với tên "${params.name}" đã tồn tại.`,
      );

    return this.categoryModel.create(params as CategoryEntity);
  }

  async getCategoryById(params: CategoryDetailDto): Promise<CategoryEntity> {
    const category = await this.categoryModel.findByPk(params.id);
    if (!category) throw new Error(`Danh mục không tồn tại.`);
    return category;
  }

  async getAllCategories(
    params: CategoryListRequestDto,
  ): Promise<CategoryListResponseDto> {
    const { page, pageSize } = params;

    if ((page === -1 && pageSize === -1) || !page || !pageSize) {
      console.log('run this');

      const categories = await this.categoryModel.findAll();
      return {
        total: categories.length,
        page: 1,
        pageSize: categories.length,
        data: categories,
      };
    }

    const data = await this.categoryModel.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    return {
      total: data.count,
      page: page,
      pageSize: pageSize,
      data: data.rows,
    };
  }

  async updateCategory(params: CategoryUpdateDto): Promise<CategoryEntity> {
    const category = await this.getCategoryById({ id: params.id });

    const existingCategory = await this.categoryModel.findOne({
      where: { name: params.name, id: { $ne: params.id } },
    });

    if (existingCategory && existingCategory.id !== params.id)
      throw new Error(`Danh mục với tên "${params.name}" đã tồn tại.`);

    await category.update(params);

    return category;
  }

  async deleteCategory(params: CategoryDeleteDto): Promise<void> {
    const category = await this.getCategoryById({ id: params.id });
    await category.destroy();
  }
}
