import {
  CategoryCreateDto,
  CategoryDeleteDto,
  CategoryListRequestDto,
  CategoryListResponseDto,
  CategoryUpdateDto,
} from '@dto';
import { CategoryEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryEntity)
    private readonly categoryModel: typeof CategoryEntity,
  ) {}

  async createCategory(params: CategoryCreateDto): Promise<CategoryEntity> {
    const existingCategory = await this.categoryModel.findOne({
      where: { name: params.name },
    });
    if (existingCategory)
      throw new Error(`Danh mục với tên "${params.name}" đã tồn tại.`);

    return this.categoryModel.create(params as CategoryEntity);
  }

  async getCategoryById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryModel.findByPk(id);
    if (!category) throw new Error(`Danh mục không tồn tại.`);
    return category;
  }

  async getAllCategories(
    params: CategoryListRequestDto,
  ): Promise<CategoryListResponseDto> {
    const { page, pageSize } = params;

    if (page === -1 && pageSize === -1) {
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
    const category = await this.getCategoryById(params.id);

    const existingCategory = await this.categoryModel.findOne({
      where: { name: params.name, id: { $ne: params.id } },
    });

    if (existingCategory && existingCategory.id !== params.id)
      throw new Error(`Danh mục với tên "${params.name}" đã tồn tại.`);

    await category.update(params);

    return category;
  }

  async deleteCategory(params: CategoryDeleteDto): Promise<void> {
    const category = await this.getCategoryById(params.id);
    await category.destroy();
  }
}
