import {
  ReviewCreateDto,
  ReviewInfoDto,
  ReviewListRequestDto,
  ReviewListResponseDto,
} from '@dto/review.dto';
import { HiringEntity, ReviewEntity, UserEntity } from '@entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewEntity)
    private readonly reviewModel: typeof ReviewEntity,
  ) {}

  async createReview(params: ReviewCreateDto): Promise<ReviewEntity> {
    return this.reviewModel.create(params as ReviewEntity);
  }

  async getReviewById(id: string): Promise<ReviewEntity> {
    const review = await this.reviewModel.findByPk(id);
    if (!review) {
      throw new NotFoundException('Không tìm thấy đánh giá');
    }
    return review;
  }

  async getReviewsByVehicle(
    params: ReviewListRequestDto,
  ): Promise<ReviewListResponseDto> {
    const reviews = await this.reviewModel.findAndCountAll({
      attributes: {
        exclude: ['updatedAt', 'status'],
      },
      include: [
        {
          model: HiringEntity,
          where: { vehicleId: params.vehicleId },
          required: true,
        },
        {
          model: UserEntity,
          attributes: ['id', 'fullName'],
        },
      ],
    });

    return {
      total: reviews.count,
      page: params.page,
      pageSize: params.pageSize,
      data: (reviews.rows as unknown as ReviewInfoDto[]) || [],
    };
  }
}
