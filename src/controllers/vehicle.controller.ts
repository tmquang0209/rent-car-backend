import { AllowUnauthorized, Permissions } from '@common/decorators';
import { PermissionKeys } from '@common/enums';
import {
  VehicleCreateDto,
  VehicleListRequestDto,
  VehicleUpdateDto,
} from '@dto/vehicle.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { VehicleService } from '@services';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('create')
  @Permissions(PermissionKeys.VEHICLE_CREATE)
  async createVehicle(@Body() params: VehicleCreateDto) {
    return this.vehicleService.createVehicle(params);
  }

  @AllowUnauthorized()
  @Get('list')
  async getList(@Query() params: VehicleListRequestDto) {
    return this.vehicleService.getAllVehicles(params);
  }

  @Get(':id')
  @AllowUnauthorized()
  async getVehicleById(@Param('id') id: string) {
    return this.vehicleService.getVehicleById(id);
  }

  @Put(':id')
  @Permissions(PermissionKeys.VEHICLE_UPDATE)
  async updateVehicle(
    @Param('id') id: string,
    @Body() params: Omit<VehicleUpdateDto, 'id'>,
  ) {
    return this.vehicleService.updateVehicle({ id, ...params });
  }

  @Delete(':id')
  @Permissions(PermissionKeys.VEHICLE_DELETE)
  async deleteVehicle(@Param('id') id: string) {
    return this.vehicleService.deleteVehicle({ id });
  }
}
