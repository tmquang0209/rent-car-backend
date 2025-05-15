import { Logger } from '@nestjs/common';
import { PermissionSeeder } from './permission.seed';
import { RolePermissionsSeeder } from './role-permissions.seed';
import { RoleSeeder } from './role.seed';
import { UserSeeder } from './user.seed';

export class Seeder {
  constructor() {}
  async run() {
    const permissionSeeder = new PermissionSeeder();
    const roleSeeder = new RoleSeeder();
    const rolePermissionsSeeder = new RolePermissionsSeeder();
    const userSeeder = new UserSeeder();

    Logger.log('Seeding database...');
    await permissionSeeder.run();
    await roleSeeder.run();
    await rolePermissionsSeeder.run();
    await userSeeder.run();
    Logger.log('Database seeded successfully.');
  }
}
