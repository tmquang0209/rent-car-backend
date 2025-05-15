import { PermissionKeys } from '@common/enums';
import { PermissionEntity, RoleEntity, RolePermissionsEntity } from '@entities';

export class RolePermissionsSeeder {
  async truncate() {
    await RolePermissionsEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await RolePermissionsEntity.destroy({
      where: {},
      truncate: true,
    });
    await RolePermissionsEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    // Truncate the table before seeding
    await this.truncate();

    const roles = await RoleEntity.findAll();

    const permissions = await PermissionEntity.findAll();

    const rolePermissions: RolePermissionsEntity[] = [];

    for (const role of roles) {
      if (role.code === 'admin') {
        for (const permission of permissions) {
          rolePermissions.push({
            roleId: role.id,
            permissionId: permission.id,
          } as RolePermissionsEntity);
        }
      } else if (role.code === 'renter') {
        // vehicle (read), category (read), hiring (read, create), review (read, create), notification (read, update)
        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.VEHICLE_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);

        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.CATEGORY_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);

        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.HIRING_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);

        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.REVIEW_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);

        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.NOTIFICATION_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);
      }
    }
    await RolePermissionsEntity.bulkCreate(rolePermissions);
  }
}
