import { CreateRoleDto, UpdateRoleDto } from '@dto';
import { PermissionEntity, RoleEntity, RolePermissionsEntity } from '@entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleEntity) private readonly roleRepo: typeof RoleEntity,
    @InjectModel(PermissionEntity)
    private readonly permissionRepo: typeof PermissionEntity,
    @InjectModel(RolePermissionsEntity)
    private readonly rolePermissionsRepo: typeof RolePermissionsEntity,
    private readonly sequelize: Sequelize,
  ) {}

  async findById(id: string) {
    const role = await this.roleRepo.findOne({
      where: { id },
      include: [
        {
          model: PermissionEntity,
          as: 'permissions',
          attributes: ['id', 'code', 'name'],
          through: { attributes: [] },
        },
      ],
      attributes: ['id', 'code', 'name', 'description'],
    });

    return role;
  }

  async findAll() {
    const roles = await this.roleRepo.findAll({
      include: [
        {
          model: PermissionEntity,
          as: 'permissions',
          attributes: ['id', 'code', 'name'],
          through: { attributes: [] },
        },
      ],
      attributes: ['id', 'code', 'name', 'description'],
    });

    return roles;
  }

  async create(params: CreateRoleDto) {
    const { permissions, ...roleInfo } = params;
    const t = await this.sequelize.transaction();
    try {
      const role = await this.roleRepo.create(roleInfo as RoleEntity, {
        transaction: t,
      });
      if (permissions) {
        const foundPermissions = await this.permissionRepo.findAll({
          where: { id: permissions },
        });

        if (foundPermissions.length > 0) {
          const rolePermissions = foundPermissions.map((permission) => ({
            roleId: role.id,
            permissionId: permission.id,
          }));
          await this.rolePermissionsRepo.bulkCreate(
            rolePermissions as RolePermissionsEntity[],
            { ignoreDuplicates: true, transaction: t },
          );
        }
      }
      await t.commit();
      return this.findById(role.id);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async update(params: UpdateRoleDto) {
    const { permissions, ...roleInfo } = params;
    const role = await this.roleRepo.findByPk(roleInfo.id);
    if (!role) throw new NotFoundException('Không tìm thấy vai trò');
    const t = await this.sequelize.transaction();
    try {
      const updatedRole = await role.update(roleInfo as RoleEntity, {
        transaction: t,
      });
      if (permissions) {
        await this.rolePermissionsRepo.destroy({
          where: { roleId: role.id },
          transaction: t,
        });

        const foundPermissions = await this.permissionRepo.findAll({
          where: { id: permissions },
        });

        if (foundPermissions.length > 0) {
          const rolePermissions = foundPermissions.map((permission) => ({
            roleId: role.id,
            permissionId: permission.id,
          }));
          await this.rolePermissionsRepo.bulkCreate(
            rolePermissions as RolePermissionsEntity[],
            { ignoreDuplicates: true, transaction: t },
          );
        }
      }

      await t.commit();
      return this.findById(updatedRole.id);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async delete(id: string) {
    const role = await this.roleRepo.findByPk(id);
    if (!role) throw new Error('Role not found');
    const t = await this.sequelize.transaction();
    try {
      const deleted = await role.destroy({ transaction: t });
      await t.commit();
      return deleted;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getPermissions() {
    const permissions = await this.permissionRepo.findAll({
      attributes: ['id', 'code', 'name'],
    });
    return permissions;
  }
}
