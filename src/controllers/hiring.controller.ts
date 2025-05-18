import { CurrentUser } from '@common/decorators';
import { BasicInfoDto } from '@dto/auth.dto';
import { HiringCreateDto } from '@dto/hiring.dto';
import { HiringEntity } from '@entities';
import { Body, Controller, Post } from '@nestjs/common';
import { HiringService } from '@services';

@Controller('hiring')
export class HiringController {
  constructor(private readonly hiringService: HiringService) {}

  @Post('create')
  async createHiring(
    @Body() params: Omit<HiringCreateDto, 'renterId'>,
    @CurrentUser() user: BasicInfoDto,
  ): Promise<HiringEntity> {
    return this.hiringService.createHiring({ ...params, renterId: user.id });
  }
}
