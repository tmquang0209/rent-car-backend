import { RoleEntity, UserEntity } from '@entities';

export class UserSeeder {
  async run() {
    const roles = await RoleEntity.findAll();
    const adminUser = {
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      birthday: new Date('1990-01-01'),
      address: '123 Admin St, City, Country',
      phoneNumber: '1234567890',
      roleId: roles.find((role) => role.code === 'admin')?.id || '',
    };

    //   check user
    const existingAdminUser = await UserEntity.findOne({
      where: { email: adminUser.email },
    });
    if (existingAdminUser) {
      console.log(`User with email ${adminUser.email} already exists.`);
    } else {
      await UserEntity.create(adminUser as UserEntity);
      console.log(`User with email ${adminUser.email} created.`);
    }

    const userUser = {
      fullName: 'Renter User',
      email: 'user@example.com',
      password: 'user123',
      roleId: roles.find((role) => role.code === 'renter')?.id,
    };
    const existingUserUser = await UserEntity.findOne({
      where: { email: userUser.email },
    });
    if (existingUserUser) {
      console.log(`User with email ${userUser.email} already exists.`);
    } else {
      await UserEntity.create(userUser as UserEntity);
      console.log(`User with email ${userUser.email} created.`);
    }
  }
}
