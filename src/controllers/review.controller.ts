import { AllowUnauthorized, ResponseMessage } from '@common/decorators';
import { ReviewListRequestDto } from '@dto/review.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ReviewService } from '@services';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('list')
  @AllowUnauthorized()
  @ResponseMessage('Lấy danh sách đánh giá thành công')
  async getList(@Query() params: ReviewListRequestDto) {
    console.log('🚀 ~ ReviewController ~ getList ~ params:', params);
    return this.reviewService.getReviewsByVehicle(params);
  }
}
