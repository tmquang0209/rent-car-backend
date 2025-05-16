import { CategoryEntity } from '@entities';

export class CategorySeeder {
  async truncate() {
    await CategoryEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');

    await CategoryEntity.destroy({
      where: {},
      truncate: true,
    });

    await CategoryEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    await this.truncate();

    const categories = [
      {
        name: 'Sedan',
        description:
          'A sedan is a passenger car in a three-box configuration with separate compartments for engine, passenger, and cargo.',
      },
      {
        name: 'SUV',
        description:
          'An SUV (Sport Utility Vehicle) is a versatile vehicle that combines elements of road-going passenger cars with off-road vehicles.',
      },
      {
        name: 'Hatchback',
        description:
          "A hatchback is a car design featuring a rear door that swings upwards, providing access to the vehicle's cargo area.",
      },
      {
        name: 'Coupe',
        description:
          'A coupe is a passenger car with a fixed roof, two doors, and a sporty design, often characterized by a sloping rear.',
      },
      {
        name: 'Convertible',
        description:
          'A convertible is a car with a roof structure that can be either entirely or partially removed, allowing for an open-air driving experience.',
      },
      {
        name: 'Pickup Truck',
        description:
          'A pickup truck is a light-duty truck with an open cargo area and a separate cabin, designed for transporting goods and passengers.',
      },
      {
        name: 'Van',
        description:
          'A van is a type of vehicle designed for transporting goods or groups of people, typically with a boxy shape and a high roof.',
      },
      {
        name: 'Wagon',
        description:
          'A wagon is a car design characterized by an extended roofline and a rear hatch door, providing additional cargo space.',
      },
      {
        name: 'Crossover',
        description:
          'A crossover is a vehicle that combines features of a car and an SUV, often built on a car platform with higher ground clearance.',
      },
      {
        name: 'Luxury',
        description:
          'A luxury vehicle is a high-end car that offers superior comfort, performance, and advanced technology features.',
      },
    ];

    await CategoryEntity.bulkCreate(categories as CategoryEntity[], {
      ignoreDuplicates: true,
    });
  }
}
