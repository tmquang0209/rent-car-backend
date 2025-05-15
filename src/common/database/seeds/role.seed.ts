import { RoleEntity } from '@entities';
export const roleSeeds = [
  {
    code: 'admin',
    name: 'Quản trị viên',
    description: 'Vai trò quản trị viên với quyền truy cập đầy đủ',
  },
  {
    code: 'trac_thu',
    name: 'Trắc thủ',
    description: 'Có quyền xem giao diện và huấn luyện',
  },
  {
    code: 'sy_quan_rada',
    name: 'Sỹ quan radar',
    description: 'Có quyền xem giao diện, huấn luyện, tài liệu',
  },
  {
    code: 'ky_su_nvcm',
    name: 'Kỹ sư, nhân viên chuyên môn',
    description:
      'Vai trò kỹ sư, nhân viên chuyên môn truy cập vào giao diện, huấn luyện, tài liệu, sơ đồ',
  },
];
export class RoleSeeder {
  constructor() {}

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
