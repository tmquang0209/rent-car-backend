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
  @ResponseMessage('Lấy thông tin người dùng thành công!')
  getUserInfo(@Req() req: Request) {
    const { id: userId } = req['user'] as BasicInfoDto;
    return this.userService.getUserById(userId);
  }

  @Post()
  @ResponseMessage('Tạo tài khoản thành công!')
  @Permissions(PermissionKeys.USER_CREATE)
  createUser(@Body() params: CreateUserDto) {
    return this.userService.createUser(params);
  }

  @Post('get-list')
  @ResponseMessage('Lấy danh sách người dùng thành công!')
  @Permissions(PermissionKeys.USER_READ)
  getListUsers() {
    return this.userService.getListUsers();
  }

  @Put('update')
  @ResponseMessage('Cập nhật thông tin người dùng thành công!')
  @Permissions(PermissionKeys.USER_UPDATE)
  updateUser(@Req() req: Request, @Body() params: UpdateUserDto) {
    const { id } = req['user'] as BasicInfoDto;
    return this.userService.updateUser({ ...params, id });
  }

  @Post('change-password')
  @ResponseMessage('Cập nhật mật khẩu thành công!')
  changePassword(@Body() params: ChangePasswordDto, @Req() req: Request) {
    const { id: userId } = req['user'] as BasicInfoDto;
    return this.userService.changePassword(params, userId);
  }

  @Get(':id/details')
  @ResponseMessage('Lấy thông tin người dùng thành công!')
  @Permissions(PermissionKeys.USER_READ)
  getDetailUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
