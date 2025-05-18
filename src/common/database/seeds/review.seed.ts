import { EReviewStatus } from '@common/enums';
import { HiringEntity, ReviewEntity, VehicleEntity } from '@entities';
import { faker } from '@faker-js/faker';

function generateVietnameseCarRentalReview(): string {
  const templates = [
    `Xe ${faker.vehicle.vehicle()} rất ${faker.word.adjective()} và dễ điều khiển. Tôi hoàn toàn hài lòng.`,
    `Dịch vụ thuê xe nhanh chóng, nhân viên ${faker.word.adjective()} và hỗ trợ rất tốt.`,
    `Tôi đã thuê xe trong ${faker.number.int({ min: 2, max: 7 })} ngày, trải nghiệm cực kỳ ${faker.word.adjective()}.`,
    `Xe được giao đúng giờ, sạch sẽ và chạy ${faker.word.adverb()}. Sẽ quay lại lần sau.`,
    `Giá cả hợp lý, xe chạy êm và tiết kiệm xăng. Rất ${faker.word.adjective()}.`,
    `Tôi không hài lòng lắm vì xe hơi ${faker.word.adjective()}, nhưng vẫn chấp nhận được.`,
    `Quá trình đặt xe khá ${faker.word.adjective()}, tuy nhiên dịch vụ chăm sóc khách hàng rất tốt.`,
    `Tôi đã thuê chiếc ${faker.vehicle.model()}, xe vận hành ${faker.word.adverb()} và không gặp sự cố gì.`,
  ];

  return faker.helpers.arrayElement(templates);
}

export class ReviewSeeder {
  async truncate() {
    await ReviewEntity.sequelize?.query(`SET FOREIGN_KEY_CHECKS = 0;`);
    await ReviewEntity.destroy({
      where: {},
      truncate: true,
    });
    await ReviewEntity.sequelize?.query(`SET FOREIGN_KEY_CHECKS = 1;`);
  }

  async run() {
    await this.truncate();

    const hirings = await HiringEntity.findAll({
      include: [
        {
          model: VehicleEntity,
          attributes: ['id', 'name'],
        },
      ],
    });

    for (const hiring of hirings) {
      const review = {
        hiringId: hiring.id,
        reviewerId: hiring.renterId,
        rating: Math.floor(Math.random() * 3) + 3, // random 3-5 star
        comment: generateVietnameseCarRentalReview(),
        status: EReviewStatus.APPROVED,
      };

      await ReviewEntity.create(review as ReviewEntity);
    }
  }
}
