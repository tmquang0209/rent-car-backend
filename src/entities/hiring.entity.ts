import { BaseEntity } from '@common/database';
import { EHiringStatus } from '@common/enums';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Table,
} from 'sequelize-typescript';
import { ReviewEntity } from './review.entity';
import { UserEntity } from './user.entity';
import { VehicleEntity } from './vehicle.entity';

@Table({
  tableName: 'hirings',
  timestamps: true,
})
export class HiringEntity extends BaseEntity<HiringEntity> {
  @ForeignKey(() => UserEntity)
  @Column({
    field: 'renter_id',
    type: DataType.UUID,
    allowNull: false,
  })
  declare renterId: string;

  @ForeignKey(() => VehicleEntity)
  @Column({
    field: 'vehicle_id',
    type: DataType.UUID,
    allowNull: false,
  })
  declare vehicleId: string;

  @Column({
    field: 'start_date',
    type: DataType.DATE,
    allowNull: false,
  })
  declare startDate: Date;

  @Column({
    field: 'end_date',
    type: DataType.DATE,
    allowNull: false,
  })
  declare endDate: Date;

  @Column({
    field: 'pickup_location',
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare pickupLocation: string;

  @Column({
    field: 'dropoff_location',
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare dropoffLocation: string;

  @Column({
    field: 'total_price',
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare totalPrice: number;

  @Column({
    field: 'status',
    type: DataType.ENUM(...Object.values(EHiringStatus)),
    allowNull: false,
    defaultValue: EHiringStatus.PENDING,
  })
  declare status: EHiringStatus;

  @Column({
    field: 'extra_info',
    type: DataType.JSONB,
    allowNull: true,
  })
  declare extraInfo: string;

  @BelongsTo(() => UserEntity, 'renterId')
  renter: UserEntity;

  @BelongsTo(() => VehicleEntity, {
    foreignKey: 'vehicleId',
    targetKey: 'id',
  })
  vehicle: VehicleEntity;

  @HasOne(() => ReviewEntity, 'hiringId')
  review: ReviewEntity;
}
