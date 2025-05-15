import { RoleEntity, UserEntity } from '@entities';

export class UserSeeder {
  constructor() {}

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
      fullName: 'Regular User',
      email: 'user@example.com',
      password: 'user123',
      roleId: roles.find((role) => role.code === 'trac_thu')?.id || '',
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

    const radarEmployeeUser = {
      fullName: 'Radar Employee User',
      email: 'radar@example.com',
      password: 'radar123',
      roleId: roles.find((role) => role.code === 'sy_quan_rada')?.id || '',
    };
    const existingRadarEmployeeUser = await UserEntity.findOne({
      where: { email: radarEmployeeUser.email },
    });
    if (existingRadarEmployeeUser) {
      console.log(`User with email ${radarEmployeeUser.email} already exists.`);
    } else {
      await UserEntity.create(radarEmployeeUser as UserEntity);
      console.log(`User with email ${radarEmployeeUser.email} created.`);
    }

    const engineerUser = {
      fullName: 'Engineer User',
      email: 'engineer@example.com',
      password: 'engineer123',
      roleId: roles.find((role) => role.code === 'ky_su_nvcm')?.id || '',
    };
    const existingEngineerUser = await UserEntity.findOne({
      where: { email: engineerUser.email },
    });
    if (existingEngineerUser) {
      console.log(`User with email ${engineerUser.email} already exists.`);
    } else {
      await UserEntity.create(engineerUser as UserEntity);
      console.log(`User with email ${engineerUser.email} created.`);
    }
  }
}
