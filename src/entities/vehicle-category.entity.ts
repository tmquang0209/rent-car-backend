import { BaseEntity } from '@common/database';
import { CategoryEntity, VehicleEntity } from '@entities';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'vehicle_categories',
  timestamps: true,
})
export class VehicleCategoryEntity extends BaseEntity<VehicleCategoryEntity> {
  @ForeignKey(() => VehicleEntity)
  @Column({
    field: 'vehicle_id',
    type: DataType.UUID,
    allowNull: false,
  })
  vehicleId: string;

  @ForeignKey(() => CategoryEntity)
  @Column({
    field: 'category_id',
    type: DataType.UUID,
    allowNull: false,
  })
  categoryId: string;

  @BelongsTo(() => VehicleEntity, 'vehicleId')
  vehicle: VehicleEntity;

  @BelongsTo(() => CategoryEntity, 'categoryId')
  category: CategoryEntity;
}
