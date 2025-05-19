import { CurrentUser } from '@common/decorators';
import { BasicInfoDto } from '@dto/auth.dto';
import {
  HiringCreateDto,
  HiringListRequestDto,
  HiringListResponseDto,
} from '@dto/hiring.dto';
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

  @Post('/list')
  async getAllHirings(
    @Body() params: HiringListRequestDto,
    @CurrentUser() user: BasicInfoDto,
  ): Promise<HiringListResponseDto> {
    return this.hiringService.getAllHirings({ ...params, renterId: user.id });
  }
}
