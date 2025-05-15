import { PermissionKeys } from '@common/enums';
import { PermissionEntity } from '@entities';
import { Logger } from '@nestjs/common';
export const permissionSeed = [
  {
    code: PermissionKeys.USER_CREATE,
    name: 'Tạo người dùng',
    description: 'Cho phép tạo người dùng mới',
  },
  {
    code: PermissionKeys.USER_READ,
    name: 'Xem thông tin người dùng',
    description: 'Cho phép xem danh sách và thông tin người dùng',
  },
  {
    code: PermissionKeys.USER_UPDATE,
    name: 'Cập nhật người dùng',
    description: 'Cho phép cập nhật thông tin người dùng',
  },
  {
    code: PermissionKeys.USER_DELETE,
    name: 'Xóa người dùng',
    description: 'Cho phép xóa người dùng khỏi hệ thống',
  },
  {
    code: PermissionKeys.EQUIPMENT_CREATE,
    name: 'Thêm thiết bị',
    description: 'Cho phép thêm thiết bị mới vào hệ thống',
  },
  {
    code: PermissionKeys.EQUIPMENT_READ,
    name: 'Xem thiết bị',
    description: 'Cho phép xem danh sách và thông tin thiết bị',
  },
  {
    code: PermissionKeys.EQUIPMENT_UPDATE,
    name: 'Cập nhật thiết bị',
    description: 'Cho phép cập nhật thông tin thiết bị',
  },
  {
    code: PermissionKeys.EQUIPMENT_DELETE,
    name: 'Xóa thiết bị',
    description: 'Cho phép xóa thiết bị khỏi hệ thống',
  },
  {
    code: PermissionKeys.ROLE_CREATE,
    name: 'Tạo vai trò',
    description: 'Cho phép tạo vai trò mới',
  },
  {
    code: PermissionKeys.ROLE_READ,
    name: 'Xem vai trò',
    description: 'Cho phép xem danh sách và thông tin vai trò',
  },
  {
    code: PermissionKeys.ROLE_UPDATE,
    name: 'Cập nhật vai trò',
    description: 'Cho phép cập nhật thông tin vai trò',
  },
  {
    code: PermissionKeys.ROLE_DELETE,
    name: 'Xóa vai trò',
    description: 'Cho phép xóa vai trò khỏi hệ thống',
  },
  {
    code: PermissionKeys.PERMISSION_CREATE,
    name: 'Tạo quyền',
    description: 'Cho phép tạo quyền mới',
  },
  {
    code: PermissionKeys.PERMISSION_READ,
    name: 'Xem quyền',
    description: 'Cho phép xem danh sách và thông tin quyền',
  },
  {
    code: PermissionKeys.PERMISSION_UPDATE,
    name: 'Cập nhật quyền',
    description: 'Cho phép cập nhật thông tin quyền',
  },
  {
    code: PermissionKeys.PERMISSION_DELETE,
    name: 'Xóa quyền',
    description: 'Cho phép xóa quyền khỏi hệ thống',
  },
  {
    code: PermissionKeys.ROLE_PERMISSION_ASSIGN,
    name: 'Gán quyền cho vai trò',
    description: 'Cho phép gán quyền cho vai trò',
  },
  {
    code: PermissionKeys.ROLE_PERMISSION_REVOKE,
    name: 'Thu hồi quyền từ vai trò',
    description: 'Cho phép thu hồi quyền từ vai trò',
  },
  {
    code: PermissionKeys.USER_ROLE_ASSIGN,
    name: 'Gán vai trò cho người dùng',
    description: 'Cho phép gán vai trò cho người dùng',
  },
  {
    code: PermissionKeys.USER_ROLE_REVOKE,
    name: 'Thu hồi vai trò từ người dùng',
    description: 'Cho phép thu hồi vai trò từ người dùng',
  },
  {
    code: PermissionKeys.INTERFACE_READ,
    name: 'Xem giao diện',
    description: 'Cho phép xem danh sách và thông tin giao diện',
  },
  {
    code: PermissionKeys.TRAINING_CREATE,
    name: 'Tạo chương trình huấn luyện',
    description: 'Cho phép tạo chương trình huấn luyện mới',
  },
  {
    code: PermissionKeys.TRAINING_READ,
    name: 'Xem chương trình huấn luyện',
    description: 'Cho phép xem danh sách và thông tin chương trình huấn luyện',
  },
  {
    code: PermissionKeys.TRAINING_UPDATE,
    name: 'Cập nhật chương trình huấn luyện',
    description: 'Cho phép cập nhật thông tin chương trình huấn luyện',
  },
  {
    code: PermissionKeys.TRAINING_DELETE,
    name: 'Xóa chương trình huấn luyện',
    description: 'Cho phép xóa chương trình huấn luyện khỏi hệ thống',
  },
  {
    code: PermissionKeys.DIAGRAM_CREATE,
    name: 'Tạo sơ đồ',
    description: 'Cho phép tạo sơ đồ mới',
  },
  {
    code: PermissionKeys.DIAGRAM_READ,
    name: 'Xem sơ đồ',
    description: 'Cho phép xem danh sách và thông tin sơ đồ',
  },
  {
    code: PermissionKeys.DIAGRAM_UPDATE,
    name: 'Cập nhật sơ đồ',
    description: 'Cho phép cập nhật thông tin sơ đồ',
  },
  {
    code: PermissionKeys.DIAGRAM_DELETE,
    name: 'Xóa sơ đồ',
    description: 'Cho phép xóa sơ đồ khỏi hệ thống',
  },
  {
    code: PermissionKeys.DOCUMENT_READ,
    name: 'Xem tài liệu',
    description: 'Cho phép xem danh sách và thông tin tài liệu',
  },
  {
    code: PermissionKeys.DOCUMENT_CREATE,
    name: 'Tạo tài liệu',
    description: 'Cho phép tạo tài liệu mới',
  },
  {
    code: PermissionKeys.DOCUMENT_UPDATE,
    name: 'Cập nhật tài liệu',
    description: 'Cho phép cập nhật thông tin tài liệu',
  },
  {
    code: PermissionKeys.DOCUMENT_DELETE,
    name: 'Xóa tài liệu',
    description: 'Cho phép xóa tài liệu khỏi hệ thống',
  },
  {
    code: PermissionKeys.QUIZZ_CREATE,
    name: 'Tạo câu hỏi trắc nghiệm',
    description: 'Cho phép tạo câu hỏi trắc nghiệm mới',
  },
  {
    code: PermissionKeys.QUIZZ_READ,
    name: 'Làm trắc nghiệm',
    description: 'Cho phép làm trắc nghiệm',
  },
  {
    code: PermissionKeys.QUIZZ_UPDATE,
    name: 'Cập nhật câu hỏi trắc nghiệm',
    description: 'Cho phép cập nhật thông tin câu hỏi trắc nghiệm',
  },
  {
    code: PermissionKeys.QUIZZ_DELETE,
    name: 'Xóa câu hỏi trắc nghiệm',
    description: 'Cho phép xóa câu hỏi trắc nghiệm khỏi hệ thống',
  },
];
export class PermissionSeeder {
  constructor() {}

  async truncate() {
    await PermissionEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await PermissionEntity.destroy({
      where: {},
      truncate: true,
    });
    await PermissionEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    // Truncate the table before seeding
    await this.truncate();

    await PermissionEntity.bulkCreate(permissionSeed as PermissionEntity[], {
      ignoreDuplicates: true,
      validate: true,
    });

    Logger.log('Permissions seeded successfully.');
  }
}
