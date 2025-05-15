import { BaseEntity } from '@common/database';
import { VehicleCategoryEntity } from '@entities';
import { Column, DataType, HasMany, Table } from 'sequelize-typescript';

@Table({
  tableName: 'categories',
  timestamps: true,
})
export class CategoryEntity extends BaseEntity<CategoryEntity> {
  @Column({
    field: 'name',
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare name: string;

  @Column({
    field: 'description',
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare description: string;

  @Column({
    field: 'is_active',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare isActive: boolean;

  @HasMany(() => VehicleCategoryEntity, 'categoryId')
  vehicleCategories: VehicleCategoryEntity[];
}
