import { Logger } from '@nestjs/common';
import { CategorySeeder } from './category.seed';
import { HiringSeeder } from './hiring.seed';
import { PermissionSeeder } from './permission.seed';
import { RolePermissionsSeeder } from './role-permissions.seed';
import { RoleSeeder } from './role.seed';
import { UserSeeder } from './user.seed';
import { VehicleSeeder } from './vehicle.seed';
import { ReviewSeeder } from './review.seed';
import { VehicleImageSeeder } from './vehicle-image.seed';

export class Seeder {
  async run() {
    const permissionSeeder = new PermissionSeeder();
    const roleSeeder = new RoleSeeder();
    const rolePermissionsSeeder = new RolePermissionsSeeder();
    const userSeeder = new UserSeeder();
    const categorySeeder = new CategorySeeder();
    const vehicleSeeder = new VehicleSeeder();
    const hiringSeeder = new HiringSeeder();
    const reviewSeeder = new ReviewSeeder();
    const vehicleImageSeeder = new VehicleImageSeeder();

    Logger.log('Seeding database...');
    await permissionSeeder.run();
    await roleSeeder.run();
    await rolePermissionsSeeder.run();
    await userSeeder.run();
    await categorySeeder.run();
    await vehicleSeeder.run();
    await hiringSeeder.run();
    await reviewSeeder.run();
    await vehicleImageSeeder.run();

    Logger.log('Database seeded successfully.');
  }
}
