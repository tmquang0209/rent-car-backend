import { CurrentUser, Permissions } from '@common/decorators';
import { PermissionKeys } from '@common/enums';
import { BasicInfoDto } from '@dto/auth.dto';
import {
  HiringCreateDto,
  HiringInfoDto,
  HiringListRequestDto,
  HiringListResponseDto,
  HiringUpdateDto,
} from '@dto/hiring.dto';
import { HiringEntity } from '@entities';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
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

  @Post('/list/dashboard')
  @Permissions(
    PermissionKeys.HIRING_READ,
    PermissionKeys.HIRING_CREATE,
    PermissionKeys.HIRING_DELETE,
    PermissionKeys.HIRING_UPDATE,
  )
  async getAllHiringsDashboard(
    @Body() params: HiringListRequestDto,
  ): Promise<HiringListResponseDto> {
    return this.hiringService.getAllHirings(params);
  }

  @Put('/update/:id')
  @Permissions(PermissionKeys.HIRING_UPDATE)
  async updateHiring(
    @Param('id') id: string,
    @Body() params: Omit<HiringUpdateDto, 'id'>,
  ): Promise<HiringInfoDto> {
    return this.hiringService.updateHiring({ ...params, id });
  }
}
