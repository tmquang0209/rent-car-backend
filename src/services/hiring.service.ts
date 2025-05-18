import { HiringCreateDto } from '@dto/hiring.dto';
import { HiringEntity } from '@entities';
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
}
