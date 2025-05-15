import { PERMISSION_KEY } from '@common/enums';
import { BasicInfoDto } from '@dto/auth.dto';
import { PermissionEntity, RolePermissionsEntity, UserEntity } from '@entities';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) return true; // no roles required, allow access

    const request = context.switchToHttp().getRequest();

    const user: BasicInfoDto | undefined = request['user'];

    // get permissions from user
    const userInfo = await UserEntity.findOne({
      where: { id: user?.id },
    });

    const permissions = await PermissionEntity.findAll({
      include: [
        {
          model: RolePermissionsEntity,
          where: {
            roleId: userInfo?.roleId,
          },
          attributes: [],
        },
      ],
      attributes: ['code'],
    });

    console.log('🚀 ~ PermissionGuard ~ canActivate ~ userInfo:', userInfo);

    const hasPermission = permissions.some((permission) => {
      return requiredPermissions.includes(permission.code); // user has the required role
    });

    return Promise.resolve(hasPermission ?? false);
  }
}
