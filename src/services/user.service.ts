import {
  BasicInfoDto,
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
} from '@dto';
import {
  PermissionEntity,
  RoleEntity,
  RolePermissionsEntity,
  UserEntity,
} from '@entities';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from '@services';
import * as bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity)
    private userRepo: typeof UserEntity,
    private roleService: RoleService,
    private readonly sequelize: Sequelize,
  ) {}

  async createUser(params: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: params.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // check roleId
    const role = await this.roleService.findById(params.roleId);
    if (!role) {
      throw new BadRequestException('Không tìm thấy quyền này!');
    }

    // create user step
    const newUser = await this.userRepo.create(params as UserEntity);
    return newUser;
  }

  async updateUser(
    params: UpdateUserDto,
  ): Promise<Omit<BasicInfoDto, 'accessToken' | 'refreshToken'>> {
    const user = await this.userRepo.findByPk(params.id, {
      include: [
        {
          model: RoleEntity,
          required: true,
          attributes: ['id', 'code', 'name'],
          include: [
            {
              model: PermissionEntity,
              required: true,
              attributes: ['id', 'code', 'name'],
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại!');
    }

    // Validate roleId if provided
    if (params.roleId && params.roleId !== user.role.id) {
      const role = await this.roleService.findById(params.roleId);
      if (!role) {
        throw new BadRequestException('Không tìm thấy quyền này!');
      }
    }

    // Update user
    await user.update(params);

    // Fetch permissions for the updated role
    const permissions = await PermissionEntity.findAll({
      include: [
        {
          model: RolePermissionsEntity,
          where: { roleId: user.role.id },
          attributes: [],
        },
      ],
    });

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthday: user.birthday,
      status: user.status,
      role: {
        id: user.role.id,
        name: user.role.name,
        code: user.role.code,
        permissions: permissions.map((permission) => ({
          id: permission.id,
          name: permission.name,
          code: permission.code,
        })),
      },
    };
  }

  async getListUsers() {
    // return await this.userRepo.findAll({
    //   attributes: ['id', 'fullName', 'email'],
    //   where: { status: UserStatus.ACTIVE },
    //   include: [
    //     {
    //       model: RoleEntity,
    //       required: true,
    //       attributes: ['id', 'roleName'],
    //     },
    //   ],
    // });
  }

  async getUserById(
    id: string,
  ): Promise<Omit<BasicInfoDto, 'accessToken' | 'refreshToken'>> {
    const user = await this.userRepo.findOne({
      where: { id },
      attributes: ['id', 'fullName', 'email', 'phoneNumber', 'birthday'],
      include: [
        {
          model: RoleEntity,
          required: true,
          attributes: ['id', 'code', 'name'],
          include: [
            {
              model: PermissionEntity,
              required: true,
              attributes: ['id', 'code', 'name'],
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng này!');
    }

    const permissions = await PermissionEntity.findAll({
      include: [
        {
          model: RolePermissionsEntity,
          where: {
            roleId: user.role.id,
          },
          attributes: ['id'],
        },
      ],
    });

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthday: user.birthday,
      status: user.status,
      role: {
        id: user.role.id,
        name: user.role.name,
        code: user.role.code,
        permissions: permissions.map((permission) => ({
          id: permission.id,
          name: permission.name,
          code: permission.code,
        })),
      },
    };
  }

  getUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async changePassword(params: ChangePasswordDto, userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!user) throw new BadRequestException('User was not found!');
    const isMatch = await bcrypt.compare(params.oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('The password is wrong!');
    }
    await this.userRepo.update(
      {
        password: await bcrypt.hash(params.newPassword, 10),
      },
      {
        where: { id: userId },
      },
    );
  }
}
