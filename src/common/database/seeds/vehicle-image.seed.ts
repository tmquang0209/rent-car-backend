import {
  VehicleCategoryEntity,
  VehicleEntity,
  VehicleImageEntity,
} from '@entities';
import { Logger } from '@nestjs/common';
import { randomInt } from 'crypto';

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

export class VehicleImageSeeder {
  async truncate() {
    await VehicleImageEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 0;');
    await VehicleImageEntity.destroy({
      where: {},
      truncate: true,
    });
    await VehicleCategoryEntity.destroy({
      where: {},
      truncate: true,
    });
    await VehicleImageEntity.sequelize?.query('SET FOREIGN_KEY_CHECKS = 1;');
  }

  async run() {
    Logger.log('Seeding vehicle images...');
    await this.truncate();

    const data = await VehicleEntity.findAll();

    // Assign random images to each vehicle (up to 5 images)
    const vehicleImages = data.flatMap((vehicle) => {
      console.log('🚀 ~ VehicleImageSeeder ~ vehicle:', vehicle.name);

      const count = randomInt(1, 5);
      const selectedImages = images
        .toSorted(() => 0.5 - Math.random())
        .slice(0, count);
      return selectedImages.map((image) => ({
        vehicleId: vehicle.id,
        imageUrl: image,
      }));
    });

    await VehicleImageEntity.bulkCreate(vehicleImages as VehicleImageEntity[], {
      ignoreDuplicates: true,
      validate: true,
    });
  }
}
