import { EFuelType, ETransmission } from '@common/enums';
import {
  CategoryEntity,
  UserEntity,
  VehicleCategoryEntity,
  VehicleEntity,
} from '@entities';

const images = [
  'https://media.istockphoto.com/id/1348050852/photo/honda-city.jpg?s=612x612&w=0&k=20&c=g50qN7jubfGQ6k2b7-sbwC0JBXXGzMn_5Hl8H9KcSOk=',
  'https://img1.icarcdn.com/68099761/main-s_used-car-carlist-honda-city-rs-e-hev-hatchback-malaysia_603b8840-7485-45a1-8f4a-e993964b32b7.png.webp?smia=xTM',
  'https://stimg.cardekho.com/images/carexteriorimages/630x420/Honda/City/9421/1739862184352/front-left-side-47.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFuM5x4YgykBOElKbUnj03t0SPaLkFnYQLQF86rM_uI682X-rSBXm9mhhb9jUx44fIv8&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEULn5H1uKe9ea_oVOYkljasLqTbHlTPMwmA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Mpk5VqrwSY1evJgSYNyp7SZTjn_W_vvJYAboUE_dGUj7AG4SeDLcoL-bZ3EOD2_YDfo&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1WUC7OB4gyv_XmRpd8ShHLPromQiRGQ4zvx261e2xAXVYU0KGwa9V2jjtmU6Uow5x_yY&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEJKwQqBhtNNF__YMxSf5Qb8WETa--UzpaYw&s',
  'https://hips.hearstapps.com/hmg-prod/images/2025-mazda-3-carbon-edition-106-67d0408f9e1f3.jpg?crop=0.772xw:0.651xh;0.135xw,0.202xh&resize=700:*',
  'https://img.autocarindia.com/model/uploads/modelimages/Hyundai-Creta-030420250118.jpg?w=872&h=578&q=75&c=1',
  'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/i20/9471/1697696007962/front-left-side-47.jpg?impolicy=resize&imwidth=480',
];

export class VehicleSeeder {
  async truncate() {
    await VehicleEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await VehicleEntity.destroy({
      where: {},
      truncate: true,
    });
    await VehicleCategoryEntity.destroy({
      where: {},
      truncate: true,
    });
    await VehicleEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    await this.truncate();

    const admin = await UserEntity.findOne({
      where: {
        email: 'admin@example.com',
      },
    });

    if (!admin) {
      throw new Error('Admin user not found');
    }

    const categories = await CategoryEntity.findAll();

    // Generate 100 varied vehicle records
    const brands = [
      { brand: 'Toyota', models: ['Camry', 'Corolla', 'Vios', 'Fortuner'] },
      { brand: 'Honda', models: ['Accord', 'Civic', 'CR-V', 'City'] },
      { brand: 'Ford', models: ['Focus', 'Ranger', 'Everest', 'EcoSport'] },
      { brand: 'Mazda', models: ['Mazda3', 'Mazda6', 'CX-5', 'CX-8'] },
      { brand: 'Hyundai', models: ['Elantra', 'Santa Fe', 'Accent', 'Tucson'] },
      { brand: 'Kia', models: ['Morning', 'Cerato', 'Sorento', 'Seltos'] },
      { brand: 'VinFast', models: ['Lux A2.0', 'Lux SA2.0', 'Fadil'] },
      { brand: 'Mercedes', models: ['C200', 'E300', 'GLC300'] },
      { brand: 'BMW', models: ['320i', 'X5', 'X3'] },
      { brand: 'Mitsubishi', models: ['Xpander', 'Outlander', 'Pajero Sport'] },
    ];

    const locations = [
      'Thanh Xuân, Hà Nội',
      'Hà Đông, Hà Nội',
      'Cầu Giấy, Hà Nội',
      'Ba Đình, Hà Nội',
      'Đống Đa, Hà Nội',
      'Hoàn Kiếm, Hà Nội',
      'Long Biên, Hà Nội',
      'Tây Hồ, Hà Nội',
      'Nam Từ Liêm, Hà Nội',
      'Bắc Từ Liêm, Hà Nội',
      'Hai Bà Trưng, Hà Nội',
      'Hoàng Mai, Hà Nội',
      'Gia Lâm, Hà Nội',
      'Thanh Trì, Hà Nội',
      'Sóc Sơn, Hà Nội',
    ];

    const transmissions = [
      ETransmission.AUTOMATIC,
      ETransmission.MANUAL,
      ETransmission.SEMI_AUTOMATIC,
    ];

    const fuelTypes = [
      EFuelType.PETROL,
      EFuelType.DIESEL,
      EFuelType.ELECTRIC,
      EFuelType.HYBRID,
      EFuelType.LPG,
      EFuelType.CNG,
      EFuelType.ETHANOL,
      EFuelType.BIOFUEL,
      EFuelType.HYDROGEN,
      EFuelType.OTHER,
    ];

    function randomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomFromArray<T>(arr: T[]): T {
      return arr[randomInt(0, arr.length - 1)];
    }

    const vehicles = Array.from({ length: 100 }).map(() => {
      const brandObj = randomFromArray(brands);
      const model = randomFromArray(brandObj.models);
      const year = randomInt(2015, 2023);
      const seats = randomFromArray([4, 5, 7]);
      const transmission = randomFromArray(transmissions);
      const fuelType = randomFromArray(fuelTypes);
      const pricePerDay = randomInt(300000, 1500000);
      const location = randomFromArray(locations);
      const licensePlate = `${String.fromCharCode(65 + randomInt(0, 25))}${String.fromCharCode(65 + randomInt(0, 25))}${randomInt(1000, 9999)}`;
      const title = `${brandObj.brand} ${model} ${year}`;
      const description = `Trải nghiệm tuyệt vời với ${brandObj.brand} ${model} đời ${year}.`;
      return {
        ownerId: admin.id,
        name: `${brandObj.brand} ${model}`,
        brand: brandObj.brand,
        model,
        year,
        licensePlate,
        location,
        seats,
        transmission,
        fuelType,
        pricePerDay,
        title,
        description,
      };
    });

    const data = await VehicleEntity.bulkCreate(vehicles as VehicleEntity[], {
      ignoreDuplicates: true,
      validate: true,
    });

    //   each vehicle can belong to multiple categories (randomly assign 1-3 categories)
    const vehicleCategories = data.flatMap((vehicle) => {
      // Shuffle categories and pick 1-3 unique categories
      const shuffled = [...categories].sort(() => 0.5 - Math.random());
      const count = randomInt(1, 3);
      const selectedCategories = shuffled.slice(0, count);
      return selectedCategories.map((category) => ({
        vehicleId: vehicle.id,
        categoryId: category.id,
      }));
    });

    await VehicleCategoryEntity.bulkCreate(
      vehicleCategories as VehicleCategoryEntity[],
      {
        ignoreDuplicates: true,
        validate: true,
      },
    );
  }
}
