import { generatePassword } from '@common/utils';
import { BasicInfoDto, ForgotPasswordDto, LoginDto, RegisterDto } from '@dto';
import { PermissionEntity, RoleEntity, UserEntity } from '@entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserEntity)
    private readonly userRepo: typeof UserEntity,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async login(params: LoginDto): Promise<BasicInfoDto> {
    const userExist = await this.userRepo.findOne({
      where: { email: params.email, status: true },
      attributes: {
        exclude: ['refreshToken', 'updatedAt', 'createdAt', 'roleId'],
      },
      include: [
        {
          model: RoleEntity,
          attributes: ['id', 'name', 'code'],
          include: [
            {
              model: PermissionEntity,
              as: 'permissions',
              attributes: ['id', 'code', 'name'],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    if (!userExist) throw new BadRequestException('Không tìm thấy tài khoản!');

    const isMatch = await bcrypt.compare(params.password, userExist.password);
    if (!isMatch) {
      throw new BadRequestException('Mật khẩu không chính xác!');
    }
    const { accessToken, refreshToken: refreshTokenNew } =
      await this.generateJwt(userExist);

    // save refresh token
    await this.userRepo.update(
      {
        refreshToken: refreshTokenNew,
      },
      {
        where: {
          id: userExist.id,
        },
      },
    );

    return {
      accessToken,
      refreshToken: refreshTokenNew,
      id: userExist.id,
      email: userExist.email,
      fullName: userExist.fullName,
      phoneNumber: userExist.phoneNumber,
      status: userExist.status,
      role: userExist.role,
    };
  }

  async generateJwt(user: UserEntity) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(user: UserEntity) {
    const payload = {
      sub: user.id,
      iss: 'virtual-docs',
      aud: 'virtual-docs-web',
      email: user.email,
      role: user.role,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });
  }

  async generateRefreshToken(user: UserEntity) {
    return this.jwtService.signAsync(
      { id: user.id },
      {
        subject: String(user.id),
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
      },
    );
  }

  async refreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<Omit<BasicInfoDto, 'refreshToken'>> {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
        refreshToken,
      },
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'password'],
      },
    });
    if (!user) throw new BadRequestException('Người dùng không tồn tại!');

    const accessToken = await this.generateAccessToken(user);

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      status: user.status,
      role: {
        id: user.role.id,
        name: user.role.name,
        code: user.role.code,
        permissions: user.role.permissions.map((permission) => ({
          id: permission.id,
          name: permission.name,
          code: permission.code,
        })),
      },
      accessToken,
    };
  }

  async register(params: RegisterDto): Promise<{ success: boolean }> {
    const userExist = await this.userRepo.findOne({
      where: { email: params.email },
    });
    if (userExist) throw new BadRequestException('Email đã tồn tại!');

    await this.userRepo.create(params as UserEntity);

    return { success: true };
  }

  async sendNewPassword(params: ForgotPasswordDto): Promise<{
    success: boolean;
  }> {
    const user = await this.userRepo.findOne({
      where: {
        email: params.email,
      },
    });
    if (!user) throw new BadRequestException('Người dùng không tồn tại!');
    const newPassword = generatePassword(8);
    console.log(
      '🚀 ~ AuthService ~ sendNewPassword ~ newPassword:',
      newPassword,
    );

    await user.update({
      password: newPassword,
    });

    await this.mailService.sendNewPassword(user.email, newPassword);

    return {
      success: true,
    };
  }
}
