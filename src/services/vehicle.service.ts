import {
  VehicleCreateDto,
  VehicleDeleteDto,
  VehicleInfoDto,
  VehicleListRequestDto,
  VehicleListResponseDto,
  VehicleUpdateDto,
} from '@dto/vehicle.dto';
import {
  UserEntity,
  VehicleCategoryEntity,
  VehicleEntity,
  VehicleImageEntity,
} from '@entities';
import { Injectable } from '@nestjs/common';
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

  async getVehicleById(id: string): Promise<VehicleEntity> {
    const vehicle = await this.vehicleModel.findOne({
      include: [
        {
          model: VehicleCategoryEntity,
          required: true,
        },
        {
          model: VehicleImageEntity,
          required: true,
        },
        {
          model: UserEntity,
          attributes: ['id', 'fullName', 'email', 'phoneNumber'],
        },
      ],
      where: {
        id,
      },
    });
    if (!vehicle) throw new Error(`Xe không tồn tại.`);
    return vehicle;
  }

  async getAllVehicles(
    params: VehicleListRequestDto,
  ): Promise<VehicleListResponseDto> {
    const { page, pageSize, categoryIds } = params;

    if (page === -1 || pageSize === -1) {
      const includeOptions =
        categoryIds && categoryIds.length > 0
          ? [
              {
                model: VehicleCategoryEntity,
                where: {
                  categoryId: {
                    [Op.in]: categoryIds,
                  },
                },
              },
              {
                model: UserEntity,
                attributes: ['id', 'fullName', 'email', 'phoneNumber'],
              },
              {
                model: VehicleImageEntity,
                required: true,
              },
            ]
          : [
              {
                model: VehicleCategoryEntity,
                required: true,
              },
              {
                model: UserEntity,
                attributes: ['id', 'fullName', 'email', 'phoneNumber'],
              },
              {
                model: VehicleImageEntity,
                required: true,
              },
            ];

      const vehicles = await this.vehicleModel.findAll({
        include: includeOptions,
      });
      return {
        total: vehicles.length,
        page: 1,
        pageSize: vehicles.length,
        data: (vehicles as unknown as VehicleInfoDto[]) || [],
      };
    }

    const { rows, count } = await this.vehicleModel.findAndCountAll({
      include: [
        {
          model: VehicleCategoryEntity,
          where: {
            categoryId: {
              [Op.in]: categoryIds,
            },
          },
        },
        {
          model: UserEntity,
          attributes: ['id', 'fullName', 'email', 'phoneNumber'],
        },
        {
          model: VehicleImageEntity,
          required: true,
        },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return {
      total: count,
      page: page,
      pageSize: pageSize,
      data: (rows as unknown as VehicleInfoDto[]) || [],
    };
  }

  async updateVehicle(params: VehicleUpdateDto): Promise<VehicleEntity> {
    const vehicle = await this.getVehicleById(params.id);

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
    const vehicle = await this.getVehicleById(params.id);
    await vehicle.destroy();
  }
}
