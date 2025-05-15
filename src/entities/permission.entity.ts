import { BaseEntity } from '@common/database';
import {
  BeforeBulkCreate,
  BeforeCreate,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { RolePermissionsEntity } from './role-permissions.entity';
import { RoleEntity } from './role.entity';

@Table({ tableName: 'permissions', timestamps: true })
export class PermissionEntity extends BaseEntity<PermissionEntity> {
  @Column({ field: 'code', type: DataType.STRING(255), allowNull: false })
  declare code: string;

  @Column({ field: 'name', type: DataType.STRING(255), allowNull: true })
  declare name: string;

  @Column({
    field: 'description',
    type: DataType.STRING(500),
    allowNull: true,
  })
  declare description: string;

  @HasMany(() => RolePermissionsEntity, {
    foreignKey: 'permissionId',
    sourceKey: 'id',
  })
  rolePermissions: RolePermissionsEntity[];

  @BelongsToMany(() => RoleEntity, {
    through: () => RolePermissionsEntity,
    foreignKey: 'permissionId',
    otherKey: 'roleId',
  })
  roles: RoleEntity[];

  @BeforeCreate
  static verifyCodeFormat(permission: PermissionEntity) {
    const regex = /^[a-zA-Z0-9-]+:(create|read|update|delete|assign|revoke)$/;
    if (!regex.test(permission.code)) {
      throw new Error('Invalid code format. Expected format: resource:action');
    }
  }

  @BeforeBulkCreate
  static verifyCodeFormatBulk(permissions: PermissionEntity[]) {
    const regex =
      /^[a-zA-Z0-9-]+:(create|read|update|delete|assign|revoke|send)$/;

    for (const permission of permissions) {
      if (!regex.test(permission.code)) {
        throw new Error(
          'Invalid code format. Expected format: resource:action',
        );
      }
    }
  }
}
