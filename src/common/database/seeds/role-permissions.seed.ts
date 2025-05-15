import { PermissionKeys } from '@common/enums';
import { PermissionEntity, RoleEntity, RolePermissionsEntity } from '@entities';

export class RolePermissionsSeeder {
  constructor() {}

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
      } else if (role.code === 'trac_thu') {
        // interface and training
        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.INTERFACE_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);

        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.TRAINING_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);
      } else if (role.code === 'sy_quan_rada') {
        // interface, training and document
        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.INTERFACE_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);

        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.TRAINING_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);

        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.DOCUMENT_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);
      } else if (role.code === 'ky_su_nvcm') {
        // interface, training, document and diagram
        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.INTERFACE_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);

        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.TRAINING_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);

        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.DOCUMENT_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);

        rolePermissions.push({
          roleId: role.id,
          permissionId: permissions.find(
            (permission) =>
              permission.code === PermissionKeys.DIAGRAM_READ.toString(),
          )?.id,
        } as RolePermissionsEntity);
      }
    }

    await RolePermissionsEntity.bulkCreate(rolePermissions);
  }
}
