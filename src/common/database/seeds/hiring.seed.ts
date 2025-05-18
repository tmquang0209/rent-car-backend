import { EHiringStatus } from '@common/enums';
import { HiringEntity, RoleEntity, UserEntity, VehicleEntity } from '@entities';
import { faker } from '@faker-js/faker';

export class HiringSeeder {
  async truncate() {
    await HiringEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await HiringEntity.destroy({
      where: {},
      truncate: true,
    });
    await HiringEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    await this.truncate();

    const renters = await UserEntity.findAll({
      include: [
        {
          model: RoleEntity,
          where: {
            code: 'renter',
          },
        },
      ],
    });

    const vehicles = await VehicleEntity.findAll();

    for (let i = 0; i < 1000; i++) {
      const hirings: HiringEntity[] = [];
      //  each renter will have 10 hirings
      for (let j = 0; j < 10; j++) {
        const randomRenter =
          renters[Math.floor(Math.random() * renters.length)];

        if (!randomRenter) {
          continue;
        }

        const randomVehicle =
          vehicles[Math.floor(Math.random() * vehicles.length)];

        const startDate = faker.date.past({ years: 1 });
        const endDate = new Date(startDate);
        endDate.setDate(
          startDate.getDate() + Math.floor(Math.random() * 10) + 1,
        );
        const totalDate = Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
        );

        const hiring = {
          vehicleId: randomVehicle.id,
          renterId: randomRenter.id,
          startDate,
          endDate,
          pickupLocation: randomVehicle.location,
          dropoffLocation: randomVehicle.location,
          totalPrice: randomVehicle.pricePerDay * totalDate,
          status: EHiringStatus.COMPLETED,
        };

        hirings.push(hiring as HiringEntity);
      }

      await HiringEntity.bulkCreate(hirings, {
        ignoreDuplicates: true,
        validate: true,
      });
      console.log(`Created ${hirings.length} hirings for renter ${i + 1}`);
    }
  }
}
