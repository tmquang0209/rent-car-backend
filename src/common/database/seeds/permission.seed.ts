import { PermissionKeys } from '@common/enums';
import { PermissionEntity } from '@entities';
import { Logger } from '@nestjs/common';

export const permissionSeed = [
  // === USER ===
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
    code: PermissionKeys.USER_ROLE_ASSIGN,
    name: 'Gán vai trò cho người dùng',
    description: 'Cho phép gán vai trò cho người dùng',
  },
  {
    code: PermissionKeys.USER_ROLE_REVOKE,
    name: 'Thu hồi vai trò từ người dùng',
    description: 'Cho phép thu hồi vai trò từ người dùng',
  },

  // === VEHICLE ===
  {
    code: PermissionKeys.VEHICLE_CREATE,
    name: 'Thêm xe',
    description: 'Cho phép thêm xe mới vào hệ thống',
  },
  {
    code: PermissionKeys.VEHICLE_READ,
    name: 'Xem xe',
    description: 'Cho phép xem danh sách và thông tin xe',
  },
  {
    code: PermissionKeys.VEHICLE_UPDATE,
    name: 'Cập nhật xe',
    description: 'Cho phép cập nhật thông tin xe',
  },
  {
    code: PermissionKeys.VEHICLE_DELETE,
    name: 'Xóa xe',
    description: 'Cho phép xóa xe khỏi hệ thống',
  },

  // === CATEGORY ===
  {
    code: PermissionKeys.CATEGORY_CREATE,
    name: 'Tạo danh mục',
    description: 'Cho phép tạo danh mục mới cho xe',
  },
  {
    code: PermissionKeys.CATEGORY_READ,
    name: 'Xem danh mục',
    description: 'Cho phép xem danh sách danh mục',
  },
  {
    code: PermissionKeys.CATEGORY_UPDATE,
    name: 'Cập nhật danh mục',
    description: 'Cho phép chỉnh sửa thông tin danh mục',
  },
  {
    code: PermissionKeys.CATEGORY_DELETE,
    name: 'Xóa danh mục',
    description: 'Cho phép xóa danh mục khỏi hệ thống',
  },

  // === HIRING ===
  {
    code: PermissionKeys.HIRING_CREATE,
    name: 'Tạo đơn thuê xe',
    description: 'Cho phép người dùng đặt thuê xe',
  },
  {
    code: PermissionKeys.HIRING_READ,
    name: 'Xem đơn thuê xe',
    description: 'Cho phép xem danh sách và chi tiết đơn thuê xe',
  },
  {
    code: PermissionKeys.HIRING_UPDATE,
    name: 'Cập nhật đơn thuê xe',
    description: 'Cho phép chỉnh sửa đơn thuê xe',
  },
  {
    code: PermissionKeys.HIRING_DELETE,
    name: 'Xóa đơn thuê xe',
    description: 'Cho phép hủy/xóa đơn thuê xe',
  },

  // === REVIEW ===
  {
    code: PermissionKeys.REVIEW_CREATE,
    name: 'Tạo đánh giá',
    description: 'Cho phép người dùng gửi đánh giá sau khi thuê xe',
  },
  {
    code: PermissionKeys.REVIEW_READ,
    name: 'Xem đánh giá',
    description: 'Cho phép xem các đánh giá của người dùng',
  },
  {
    code: PermissionKeys.REVIEW_UPDATE,
    name: 'Cập nhật đánh giá',
    description: 'Cho phép chỉnh sửa đánh giá đã gửi',
  },
  {
    code: PermissionKeys.REVIEW_DELETE,
    name: 'Xóa đánh giá',
    description: 'Cho phép xóa đánh giá khỏi hệ thống',
  },

  // === NOTIFICATION ===
  {
    code: PermissionKeys.NOTIFICATION_READ,
    name: 'Xem thông báo',
    description: 'Cho phép xem danh sách thông báo',
  },
  {
    code: PermissionKeys.NOTIFICATION_SEND,
    name: 'Gửi thông báo',
    description: 'Cho phép gửi thông báo đến người dùng',
  },
  {
    code: PermissionKeys.NOTIFICATION_DELETE,
    name: 'Xóa thông báo',
    description: 'Cho phép xóa thông báo khỏi hệ thống',
  },

  // === ROLE ===
  {
    code: PermissionKeys.ROLE_CREATE,
    name: 'Tạo vai trò',
    description: 'Cho phép tạo vai trò người dùng mới',
  },
  {
    code: PermissionKeys.ROLE_READ,
    name: 'Xem vai trò',
    description: 'Cho phép xem danh sách và chi tiết vai trò',
  },
  {
    code: PermissionKeys.ROLE_UPDATE,
    name: 'Cập nhật vai trò',
    description: 'Cho phép chỉnh sửa thông tin vai trò',
  },
  {
    code: PermissionKeys.ROLE_DELETE,
    name: 'Xóa vai trò',
    description: 'Cho phép xóa vai trò khỏi hệ thống',
  },

  // === PERMISSION ===
  {
    code: PermissionKeys.PERMISSION_CREATE,
    name: 'Tạo quyền',
    description: 'Cho phép tạo quyền truy cập mới',
  },
  {
    code: PermissionKeys.PERMISSION_READ,
    name: 'Xem quyền',
    description: 'Cho phép xem danh sách và thông tin quyền',
  },
  {
    code: PermissionKeys.PERMISSION_UPDATE,
    name: 'Cập nhật quyền',
    description: 'Cho phép chỉnh sửa thông tin quyền',
  },
  {
    code: PermissionKeys.PERMISSION_DELETE,
    name: 'Xóa quyền',
    description: 'Cho phép xóa quyền khỏi hệ thống',
  },
  {
    code: PermissionKeys.ROLE_PERMISSION_ASSIGN,
    name: 'Gán quyền cho vai trò',
    description: 'Cho phép gán quyền cho một vai trò cụ thể',
  },
  {
    code: PermissionKeys.ROLE_PERMISSION_REVOKE,
    name: 'Thu hồi quyền từ vai trò',
    description: 'Cho phép thu hồi quyền khỏi vai trò',
  },
];

export class PermissionSeeder {
  async truncate() {
    await PermissionEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await PermissionEntity.destroy({
      where: {},
      truncate: true,
    });
    await PermissionEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    await this.truncate();

    await PermissionEntity.bulkCreate(permissionSeed as PermissionEntity[], {
      ignoreDuplicates: true,
      validate: true,
    });

    Logger.log('Permissions seeded successfully.');
  }
}
