import { Permissions, ResponseMessage } from '@common/decorators';
import { PermissionKeys } from '@common/enums';
import {
  BasicInfoDto,
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
} from '@dto';
import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UserService } from '@services';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  @ResponseMessage('Get user info success!')
  getUserInfo(@Req() req: Request) {
    const { id: userId } = req['user'] as BasicInfoDto;
    return this.userService.getUserById(userId);
  }

  @Post()
  @ResponseMessage('Create user success!')
  @Permissions(PermissionKeys.USER_CREATE)
  createUser(@Body() params: CreateUserDto) {
    return this.userService.createUser(params);
  }

  @Post('get-list')
  @ResponseMessage('Get user list success!')
  @Permissions(PermissionKeys.USER_READ)
  getListUsers() {
    return this.userService.getListUsers();
  }

  @Put('update')
  @ResponseMessage('Update user info success!')
  @Permissions(PermissionKeys.USER_UPDATE)
  updateUser(@Req() req: Request, @Body() params: UpdateUserDto) {
    const { id } = req['user'] as BasicInfoDto;
    return this.userService.updateUser({ ...params, id });
  }

  @Post('change-password')
  @ResponseMessage('Change password success!')
  changePassword(@Body() params: ChangePasswordDto, @Req() req: Request) {
    const { id: userId } = req['user'] as BasicInfoDto;
    return this.userService.changePassword(params, userId);
  }

  @Get(':id/details')
  @ResponseMessage('Get user info success!')
  @Permissions(PermissionKeys.USER_READ)
  getDetailUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
