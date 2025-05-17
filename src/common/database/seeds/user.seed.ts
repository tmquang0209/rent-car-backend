import { RoleEntity, UserEntity } from '@entities';

export class UserSeeder {
  async truncate() {
    await UserEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await UserEntity.destroy({
      where: {},
      truncate: true,
    });
    await UserEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    await this.truncate();
    const roles = await RoleEntity.findAll();
    const adminUser = {
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      birthday: new Date('1990-01-01'),
      address: '123 Admin St, City, Country',
      phoneNumber: '1234567890',
      roleId: roles.find((role) => role.code === 'admin')?.id,
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

    // const roles = await RoleEntity.findOne({
    //   where: {
    //     code: 'renter',
    //   },
    // });
    // const renterRole = roles?.id;
    // // seed 1000 users
    // const usersData: UserEntity[] = [];
    // for (let i = 0; i < 1000; i++) {
    //   const randomPhoneNumber = '039' + Math.floor(Math.random() * 10000000);

    //   const user = {
    //     fullName: customFaker.person.fullName(),
    //     email: customFaker.internet.email(),
    //     password: customFaker.internet.password(),
    //     birthday: customFaker.date.past({
    //       years: 22,
    //     }),
    //     address: customFaker.location.streetAddress(),
    //     phoneNumber: randomPhoneNumber,
    //     roleId: renterRole,
    //   };

    //   usersData.push(user as UserEntity);
    // }
    // await UserEntity.bulkCreate(usersData, {
    //   ignoreDuplicates: true,
    //   validate: true,
    // });
  }
}
