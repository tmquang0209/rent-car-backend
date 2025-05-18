import { RoleEntity, UserEntity } from '@entities';
import { en, Faker, vi } from '@faker-js/faker';

const customFaker = new Faker({
  locale: [vi, en],
});

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

    const renterRole = roles.find((role) => role.code === 'renter')?.id;
    // seed 1000 users
    const usersData: UserEntity[] = [];
    const usedPhoneNumbers = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      let randomPhoneNumber: string;
      do {
        randomPhoneNumber =
          '039' + Math.floor(1000000 + Math.random() * 9000000).toString();
      } while (usedPhoneNumbers.has(randomPhoneNumber));
      usedPhoneNumbers.add(randomPhoneNumber);

      const fullName = customFaker.person.fullName();
      const email = customFaker.internet.email({
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ')[1],
        allowSpecialCharacters: true,
        provider: 'gmail.com',
      });

      // add timestamp to email
      const timestamp = Date.now();
      const emailWithTimestamp = `${email.split('@')[0]}_${timestamp}@${email.split('@')[1]}`;

      const user = {
        fullName: customFaker.person.fullName(),
        email: emailWithTimestamp,
        password: '12345678',
        birthday: customFaker.date.past({
          years: 22,
        }),
        address: customFaker.location.streetAddress(),
        phoneNumber: randomPhoneNumber,
        roleId: renterRole,
      };

      usersData.push(user as UserEntity);
    }
    await UserEntity.bulkCreate(usersData, {
      ignoreDuplicates: true,
      validate: true,
    });
  }
}
