import { HiringInfoDto } from '@dto/hiring.dto';
import {
  VehicleCreateDto,
  VehicleDeleteDto,
  VehicleInfoDto,
  VehicleListRequestDto,
  VehicleListResponseDto,
  VehicleUpdateDto,
} from '@dto/vehicle.dto';
import {
  CategoryEntity,
  HiringEntity,
  ReviewEntity,
  UserEntity,
  VehicleCategoryEntity,
  VehicleEntity,
  VehicleImageEntity,
} from '@entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(VehicleEntity)
    private readonly vehicleModel: typeof VehicleEntity,
    @InjectModel(VehicleCategoryEntity)
    private readonly vehicleCategoryModel: typeof VehicleCategoryEntity,
    @InjectModel(VehicleImageEntity)
    private readonly vehicleImageModel: typeof VehicleImageEntity,
    private readonly sequelize: Sequelize,
  ) {}

  async createVehicle(params: VehicleCreateDto): Promise<VehicleEntity> {
    const { categories, images, ...rest } = params;
    const t = await this.sequelize.transaction();
    try {
      const vehicleCreated = await this.vehicleModel.create(
        {
          ...rest,
        } as unknown as VehicleEntity,
        {
          transaction: t,
        },
      );

      if (categories && categories.length > 0) {
        const vehicleCategories = categories.map((categoryId) => ({
          vehicleId: vehicleCreated.id,
          categoryId,
        }));
        await this.vehicleCategoryModel.bulkCreate(
          vehicleCategories as VehicleCategoryEntity[],
          {
            transaction: t,
          },
        );
      }

      if (images && images.length > 0) {
        const vehicleImages = images.map((image) => ({
          vehicleId: vehicleCreated.id,
          imageUrl: image,
        }));
        await this.vehicleImageModel.bulkCreate(
          vehicleImages as VehicleImageEntity[],
          {
            transaction: t,
          },
        );
      }

      await t.commit();
      return vehicleCreated;
    } catch (error) {
      await t.rollback();
      throw new Error(`Tạo xe thất bại: ${error.message}`);
    }
  }

  async getVehicleById(id: string): Promise<HiringInfoDto> {
    const vehicle = await this.vehicleModel.findOne({
      include: [
        {
          model: CategoryEntity,
          attributes: ['id', 'name'],
          through: { attributes: [] },
          required: false,
        },
        {
          model: VehicleImageEntity,
          required: false,
          attributes: ['id', 'imageUrl'],
        },
        {
          model: UserEntity,
          attributes: ['id', 'fullName', 'email', 'phoneNumber'],
          as: 'owner',
        },
        {
          model: HiringEntity,
          as: 'hirings',
          required: false,
          attributes: [],
          include: [
            {
              model: ReviewEntity,
              attributes: ['id', 'rating', 'comment'],
            },
          ],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'ownerId'],
        include: [
          [
            Sequelize.literal(`(
              SELECT COALESCE(AVG(reviews.rating), 0)
              FROM hirings AS h
              LEFT JOIN reviews ON h.id = reviews.hiring_id
              WHERE h.vehicle_id = VehicleEntity.id
            )`),
            'averageRating',
          ],
        ],
      },
      where: {
        id,
      },
    });

    if (!vehicle) {
      throw new NotFoundException(`Xe không tồn tại.`);
    }

    return vehicle as unknown as HiringInfoDto;
  }

  async getAllVehicles(
    params: VehicleListRequestDto,
  ): Promise<VehicleListResponseDto> {
    const { page, pageSize, categories = [] } = params;
    console.log('🚀 ~ VehicleService ~ categories:', categories);

    const includeOptions: any[] = [
      {
        model: UserEntity,
        attributes: ['id', 'fullName', 'email', 'phoneNumber'],
        as: 'owner',
        required: false,
      },
      {
        model: VehicleImageEntity,
        required: false,
        attributes: ['id', 'imageUrl'],
      },
      {
        model: HiringEntity,
        as: 'hirings',
        required: false,
        attributes: [],
        include: [
          {
            model: ReviewEntity,
            attributes: [],
            required: false,
          },
        ],
      },
    ];

    if (categories.length > 0) {
      includeOptions.push({
        model: CategoryEntity,
        as: 'categories',
        through: { attributes: [] },
        where: {
          [Op.or]: [
            { id: { [Op.in]: categories } },
            { name: { [Op.in]: categories } },
          ],
        },
        required: true,
      });
    } else {
      includeOptions.push({
        model: CategoryEntity,
        through: { attributes: [] },
        required: false,
      });
    }

    const findOptions: import('sequelize').FindAndCountOptions<VehicleEntity> =
      {
        include: includeOptions,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'ownerId'],
          include: [
            [
              Sequelize.literal(`(
              SELECT COALESCE(AVG(reviews.rating), 0)
              FROM hirings AS h
              LEFT JOIN reviews ON h.id = reviews.hiring_id
              WHERE h.vehicle_id = VehicleEntity.id
            )`),
              'averageRating',
            ],
          ],
        },
        group: ['VehicleEntity.id'],
      };

    if (page !== -1 && pageSize !== -1) {
      findOptions.limit = pageSize;
      findOptions.offset = (page - 1) * pageSize;
      const { rows, count } =
        await this.vehicleModel.findAndCountAll(findOptions);
      return {
        total: count,
        page,
        pageSize,
        data: rows as unknown as (VehicleInfoDto & { averageRating: number })[],
      };
    } else {
      const vehicles = await this.vehicleModel.findAll(findOptions);
      console.log('🚀 ~ VehicleService ~ vehicles:', vehicles.length);
      return {
        total: vehicles.length,
        page: 1,
        pageSize: vehicles.length,
        data: vehicles as unknown as (VehicleInfoDto & {
          averageRating: number;
        })[],
      };
    }
  }

  async updateVehicle(params: VehicleUpdateDto): Promise<VehicleEntity> {
    const vehicle = await this.vehicleModel.findByPk(params.id);
    if (!vehicle) {
      throw new NotFoundException(`Xe không tồn tại.`);
    }

    const { categories, images, ...rest } = params;
    const t = await this.sequelize.transaction();
    try {
      await vehicle.update(rest as unknown as VehicleEntity, {
        transaction: t,
      });
      if (categories && categories.length > 0) {
        await this.vehicleCategoryModel.destroy({
          where: {
            vehicleId: vehicle.id,
          },
          transaction: t,
        });
        const vehicleCategories = categories.map((categoryId) => ({
          vehicleId: vehicle.id,
          categoryId,
        }));
        await this.vehicleCategoryModel.bulkCreate(
          vehicleCategories as VehicleCategoryEntity[],
          {
            transaction: t,
          },
        );
      }
      if (images && images.length > 0) {
        await this.vehicleImageModel.destroy({
          where: {
            vehicleId: vehicle.id,
          },
          transaction: t,
        });
        const vehicleImages = images.map((image) => ({
          vehicleId: vehicle.id,
          imageUrl: image,
        }));
        await this.vehicleImageModel.bulkCreate(
          vehicleImages as VehicleImageEntity[],
          {
            transaction: t,
          },
        );
      }
      await t.commit();

      return vehicle;
    } catch (error) {
      await t.rollback();
      throw new Error(`Cập nhật xe thất bại: ${error.message}`);
    }
  }

  async deleteVehicle(params: VehicleDeleteDto): Promise<void> {
    const vehicle = await this.vehicleModel.findByPk(params.id);
    if (!vehicle) {
      throw new NotFoundException(`Xe không tồn tại.`);
    }
    await vehicle.destroy();
  }
}
