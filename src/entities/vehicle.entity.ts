import { BaseEntity } from '@common/database';
import { EFuelType, ETransmission, EVehicleStatus } from '@common/enums';
import {
  CategoryEntity,
  UserEntity,
  VehicleCategoryEntity,
  VehicleImageEntity,
} from '@entities';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'vehicles', timestamps: true })
export class VehicleEntity extends BaseEntity<VehicleEntity> {
  @Column({
    field: 'owner_id',
    type: DataType.UUID,
    allowNull: false,
  })
  declare ownerId: string;

  @Column({
    field: 'name',
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare name: string;

  @Column({
    field: 'brand',
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare brand: string;

  @Column({
    field: 'model',
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare model: string;

  @Column({
    field: 'year',
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare year: number;

  @Column({
    field: 'license_plate',
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  declare licensePlate: string;

  @Column({
    field: 'location',
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare location: string;

  @Column({
    field: 'seats',
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 4,
  })
  declare seats: number;

  @Column({
    field: 'transmission',
    type: DataType.ENUM(...Object.values(ETransmission)),
    allowNull: false,
    defaultValue: ETransmission.MANUAL,
  })
  declare transmission: ETransmission;

  @Column({
    field: 'fuel_type',
    type: DataType.ENUM(...Object.values(EFuelType)),
    allowNull: false,
    defaultValue: EFuelType.PETROL,
  })
  declare fuelType: EFuelType;

  @Column({
    field: 'price_per_day',
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare pricePerDay: number;

  @Column({
    field: 'description',
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    field: 'title',
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare title: string;

  @Column({
    field: 'is_active',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare isActive: boolean;

  @Column({
    field: 'status',
    type: DataType.ENUM(...Object.values(EVehicleStatus)),
    allowNull: false,
    defaultValue: EVehicleStatus.AVAILABLE,
  })
  declare status: EVehicleStatus;

  @Column({
    field: 'mileage',
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: -1,
  })
  declare mileage: number;

  @BelongsTo(() => UserEntity, {
    foreignKey: 'ownerId',
    targetKey: 'id',
    as: 'owner',
  })
  declare owner: UserEntity;

  @HasMany(() => VehicleCategoryEntity)
  declare vehicleCategory: VehicleCategoryEntity[];

  @HasMany(() => VehicleImageEntity)
  declare images: VehicleImageEntity[];

  // many to many: CategoryEntity
  @BelongsToMany(() => CategoryEntity, {
    through: () => VehicleCategoryEntity,
    foreignKey: 'vehicleId',
    otherKey: 'categoryId',
  })
  declare categories: CategoryEntity[];
}
