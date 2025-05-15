import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export abstract class BaseEntity<T extends {}> extends Model<T> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  declare updatedAt: Date;

  // @DeletedAt
  // @Column({
  //   field: "deleted_at",
  //   type: DataType.DATE,
  //   allowNull: true,
  // })
  // declare deletedAt?: Date;
}
