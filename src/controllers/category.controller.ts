import { Permissions, ResponseMessage } from '@common/decorators';
import { PermissionKeys } from '@common/enums';
import {
  CategoryCreateDto,
  CategoryListRequestDto,
  CategoryUpdateDto,
} from '@dto/category.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from '@services';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
    // Constructor logic here
  }

  @Post('create')
  @ResponseMessage('Tạo danh mục thành công')
  @Permissions(PermissionKeys.CATEGORY_CREATE)
  async createCategory(@Body() params: CategoryCreateDto) {
    return this.categoryService.createCategory(params);
  }
  @Get('list')
  @ResponseMessage('Lấy danh sách danh mục thành công')
  @Permissions(
    PermissionKeys.CATEGORY_READ,
    PermissionKeys.CATEGORY_CREATE,
    PermissionKeys.CATEGORY_UPDATE,
    PermissionKeys.CATEGORY_DELETE,
  )
  async getList(@Query() params: CategoryListRequestDto) {
    return this.categoryService.getAllCategories(params);
  }

  @Get(':id')
  @ResponseMessage('Lấy danh mục thành công')
  @Permissions(
    PermissionKeys.CATEGORY_READ,
    PermissionKeys.CATEGORY_CREATE,
    PermissionKeys.CATEGORY_UPDATE,
    PermissionKeys.CATEGORY_DELETE,
  )
  async getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById({ id });
  }

  @Put(':id')
  @ResponseMessage('Cập nhật danh mục thành công')
  @Permissions(PermissionKeys.CATEGORY_UPDATE)
  async updateCategory(
    @Body() params: Omit<CategoryUpdateDto, 'id'>,
    @Param('id') id: string,
  ) {
    return this.categoryService.updateCategory({ id, ...params });
  }

  @Delete(':id')
  @ResponseMessage('Xóa danh mục thành công')
  @Permissions(PermissionKeys.CATEGORY_DELETE)
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory({ id });
  }
}
