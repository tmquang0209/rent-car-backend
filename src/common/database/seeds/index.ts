import { Logger } from '@nestjs/common';
import { CategorySeeder } from './category.seed';
import { PermissionSeeder } from './permission.seed';
import { RolePermissionsSeeder } from './role-permissions.seed';
import { RoleSeeder } from './role.seed';
import { UserSeeder } from './user.seed';
import { VehicleSeeder } from './vehicle.seed';

export class Seeder {
  async run() {
    const permissionSeeder = new PermissionSeeder();
    const roleSeeder = new RoleSeeder();
    const rolePermissionsSeeder = new RolePermissionsSeeder();
    const userSeeder = new UserSeeder();
    const categorySeeder = new CategorySeeder();
    const vehicleSeeder = new VehicleSeeder();

    Logger.log('Seeding database...');
    await permissionSeeder.run();
    await roleSeeder.run();
    await rolePermissionsSeeder.run();
    await userSeeder.run();
    await categorySeeder.run();
    await vehicleSeeder.run();

    Logger.log('Database seeded successfully.');
  }
}
