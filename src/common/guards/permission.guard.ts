import { PERMISSION_KEY } from '@common/enums';
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

    const user = request['user'];

    const userInfo = await UserEntity.findOne({
      where: { id: user?.id }, // was user?.sub (wrong, because sub was not returned)
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

    const hasPermission = permissions.some((permission) => {
      return requiredPermissions.includes(permission.code); // user has the required role
    });

    return hasPermission ?? false;
  }
}
