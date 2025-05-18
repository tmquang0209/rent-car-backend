import { BaseEntity } from '@common/database';
import { HiringEntity, RoleEntity } from '@entities';
import * as bcrypt from 'bcryptjs';
import {
  BeforeBulkCreate,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class UserEntity extends BaseEntity<UserEntity> {
  @Column({ field: 'full_name', type: DataType.STRING(255), allowNull: false })
  declare fullName: string;

  @Column({ field: 'email', type: DataType.STRING(255), allowNull: false })
  declare email: string;

  @Column({ field: 'phone_number', type: DataType.STRING(11), allowNull: true })
  declare phoneNumber: string;

  @Column({ field: 'password', type: DataType.STRING(255), allowNull: false })
  declare password: string;

  @Column({ field: 'birthday', type: DataType.DATE, allowNull: true })
  declare birthday: Date;

  @Column({ field: 'address', type: DataType.STRING(255), allowNull: true })
  declare address: string;

  @ForeignKey(() => RoleEntity)
  @Column({ field: 'role_id', type: DataType.UUID, allowNull: false })
  declare roleId: string;

  @Column({
    field: 'refresh_token',
    type: DataType.STRING(500),
    allowNull: true,
  })
  declare refreshToken: string;

  @Column({
    field: 'status',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare status: boolean;

  @BelongsTo(() => RoleEntity, 'roleId')
  declare role: RoleEntity;

  @HasMany(() => HiringEntity, 'renterId')
  declare hirings: HiringEntity[];

  @BeforeCreate
  static async hashPassword(user: UserEntity) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  @BeforeUpdate
  static async hashPasswordUpdate(user: UserEntity) {
    if (user.changed('password') && user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  @BeforeBulkCreate
  static async hashBulkPasswords(users: UserEntity[]) {
    for (const user of users) {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
}
