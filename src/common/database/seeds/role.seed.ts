import { RoleEntity } from '@entities';
export const roleSeeds = [
  {
    code: 'admin',
    name: 'Quản trị viên',
    description: 'Vai trò quản trị viên với quyền truy cập đầy đủ',
  },
  {
    code: 'renter',
    name: 'Người thuê xe',
    description: 'Vai trò người thuê xe với quyền truy cập hạn chế',
  },
];
export class RoleSeeder {
  async truncate() {
    await RoleEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await RoleEntity.destroy({
      where: {},
      truncate: true,
    });
    await RoleEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    // Truncate the table before seeding
    await this.truncate();

    await RoleEntity.bulkCreate(roleSeeds as RoleEntity[], {
      ignoreDuplicates: true,
      returning: true,
    });
  }
}
