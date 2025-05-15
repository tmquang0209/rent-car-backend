import { BaseEntity } from '@common/database';
import { VehicleEntity } from '@entities';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'vehicle_images',
  timestamps: true,
})
export class VehicleImageEntity extends BaseEntity<VehicleImageEntity> {
  @ForeignKey(() => VehicleEntity)
  @Column({
    field: 'vehicle_id',
    type: DataType.UUID,
    allowNull: false,
  })
  declare vehicleId: string;

  @Column({
    field: 'image_url',
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare imageUrl: string;

  @BelongsTo(() => VehicleEntity, 'vehicleId')
  vehicle: VehicleEntity;
}
