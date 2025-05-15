import { BaseEntity } from '@common/database';

import { EHiringStatus } from '@common/enums';

import { Column, DataType, Table } from 'sequelize-typescript';

@Table({
  tableName: 'hirings',
  timestamps: true,
})
export class HiringEntity extends BaseEntity<HiringEntity> {
  @Column({
    field: 'renter_id',
    type: DataType.STRING,
    allowNull: false,
  })
  declare renterId: string;

  @Column({
    field: 'vehicle_id',
    type: DataType.STRING,
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
}
