import { Permissions, ResponseMessage } from '@common/decorators';
import { PermissionKeys } from '@common/enums';
import { CreateRoleDto, UpdateRoleDto } from '@dto/role.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from '@services';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':roleId')
  @ResponseMessage('Get info role success!')
  @Permissions(PermissionKeys.ROLE_READ)
  findById(@Param('roleId') roleId: string) {
    return this.roleService.findById(roleId);
  }

  @Get()
  @ResponseMessage('Get list of roles success!')
  @Permissions(PermissionKeys.ROLE_READ)
  findAll() {
    return this.roleService.findAll();
  }

  @Post()
  @ResponseMessage('Create role success!')
  @Permissions(PermissionKeys.ROLE_CREATE)
  createRole(@Body() params: CreateRoleDto) {
    return this.roleService.create(params);
  }

  @Put('/:roleId')
  @ResponseMessage('Update role success!')
  @Permissions(PermissionKeys.ROLE_UPDATE)
  updateRole(
    @Param('roleId') roleId: string,
    @Body() params: Omit<UpdateRoleDto, 'id'>,
  ) {
    return this.roleService.update({ id: roleId, ...params });
  }

  @Delete('/:roleId')
  @ResponseMessage('Delete role success!')
  @Permissions(PermissionKeys.ROLE_DELETE)
  deleteRole(@Param('roleId') roleId: string) {
    return this.roleService.delete(roleId);
  }

  @Get('permissions')
  @ResponseMessage('Get list of permissions success!')
  @Permissions(
    PermissionKeys.ROLE_READ,
    PermissionKeys.ROLE_CREATE,
    PermissionKeys.ROLE_UPDATE,
  )
  getAllPermissions() {
    return this.roleService.getPermissions();
  }
}
