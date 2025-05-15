import { databaseConfig } from '@common/database';
import { JwtStrategy } from '@common/guards';
import { AuthController, UploadController, UserController } from '@controllers';
import {
  PermissionEntity,
  RoleEntity,
  RolePermissionsEntity,
  UserEntity,
} from '@entities';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  AuthService,
  MailService,
  MinioService,
  RoleService,
  UserService,
} from '@services';
import { join } from 'path';
import { RoleController } from './controllers/role.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRES },
      }),
    }),
    SequelizeModule.forFeature([
      UserEntity,
      RoleEntity,
      RolePermissionsEntity,
      PermissionEntity,
    ]),
    SequelizeModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.MAIL_FROM}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [
    UserController,
    AuthController,
    UploadController,
    RoleController,
  ], // need to add controllers here
  providers: [
    AuthService,
    UserService,
    MinioService,
    MailService,
    RoleService,
    JwtStrategy,
  ], // need to add providers here
})
export class AppModule {}
