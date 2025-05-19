import {
  HiringCreateDto,
  HiringInfoDto,
  HiringListRequestDto,
  HiringListResponseDto,
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

  async getAllHirings(
    params: HiringListRequestDto,
  ): Promise<HiringListResponseDto> {
    const { page, pageSize } = params;
    console.log('🚀 ~ HiringService ~ params:', params);

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
        where: {
          renterId: params.renterId,
        },
      });
      return {
        page: 1,
        pageSize: allHirings.length,
        total: allHirings.length,
        data: allHirings as unknown as HiringInfoDto[],
      };
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
      where: {
        renterId: params.renterId,
      },
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
}
