import {
  HiringCreateDto,
  HiringInfoDto,
  HiringListRequestDto,
  HiringListResponseDto,
  HiringUpdateDto,
} from '@dto';
import {
  HiringEntity,
  UserEntity,
  VehicleEntity,
  VehicleImageEntity,
} from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class HiringService {
  constructor(
    @InjectModel(HiringEntity)
    private readonly hiringModel: typeof HiringEntity,
  ) {}

  async createHiring(hiring: HiringCreateDto): Promise<HiringEntity> {
    return this.hiringModel.create(hiring as unknown as HiringEntity);
  }

  async findHiringById(id: string): Promise<HiringInfoDto> {
    const hiring = await this.hiringModel.findOne({
      where: { id },
      include: [
        {
          model: UserEntity,
          required: false,
          attributes: ['id', 'fullName', 'email', 'phoneNumber'],
        },
        {
          model: VehicleEntity,
          required: false,
          attributes: ['id', 'name', 'brand', 'model'],
        },
      ],
    });
    return hiring as unknown as HiringInfoDto;
  }

  async getAllHirings(
    params: HiringListRequestDto,
  ): Promise<HiringListResponseDto> {
    const { page, pageSize } = params;

    if (page === -1 && pageSize === -1) {
      const allHirings = await this.hiringModel.findAll({
        include: [
          {
            model: UserEntity,
            required: false,
            attributes: ['id', 'fullName', 'email', 'phoneNumber'],
          },
          {
            model: VehicleEntity,
            required: false,
            attributes: [
              'id',
              'name',
              'brand',
              'model',
              'year',
              'licensePlate',
              'location',
              'seats',
              'transmission',
              'fuelType',
              'pricePerDay',
            ],
            include: [
              {
                model: VehicleImageEntity,
                attributes: ['id', 'imageUrl'],
                required: false,
              },
            ],
          },
        ],
        attributes: {
          exclude: ['createdAt', 'renterId', 'vehicleId'],
        },
      });
      return {
        page: 1,
        pageSize: allHirings.length,
        total: allHirings.length,
        data: allHirings as unknown as HiringInfoDto[],
      };
    }

    const where = {};
    if (params.renterId) {
      where['renterId'] = params.renterId;
    }

    const { count, rows } = await this.hiringModel.findAndCountAll({
      include: [
        {
          model: UserEntity,
          attributes: ['id', 'fullName', 'email', 'phoneNumber'],
        },
        {
          model: VehicleEntity,
          attributes: [
            'id',
            'name',
            'brand',
            'model',
            'year',
            'licensePlate',
            'location',
            'seats',
            'transmission',
            'fuelType',
            'pricePerDay',
          ],
          include: [
            {
              model: VehicleImageEntity,
              attributes: ['id', 'imageUrl'],
              required: false,
            },
          ],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'renterId', 'vehicleId'],
      },
      where,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return {
      page,
      pageSize,
      total: count,
      data: rows as unknown as HiringInfoDto[],
    };
  }

  async updateHiring(params: HiringUpdateDto): Promise<HiringInfoDto> {
    const { id, ...rest } = params;
    await this.hiringModel.update(rest as unknown as HiringEntity, {
      where: { id },
      returning: true,
    });
    return this.findHiringById(id);
  }
}
