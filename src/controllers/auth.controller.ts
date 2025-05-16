import { ResponseMessage } from '@common/decorators';
import { AllowUnauthorized } from '@common/decorators/allow-unauthorized.decorator';
import { RefreshTokenGuard } from '@common/guards';
import { ForgotPasswordDto, LoginDto, RegisterDto } from '@dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService, RoleService } from '@services';
import { MailService } from 'src/services/mail.service';

@AllowUnauthorized()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly roleService: RoleService,
  ) {}

  @Post('login')
  @ResponseMessage('Login successful!')
  login(@Body() params: LoginDto) {
    return this.authService.login(params);
  }

  @Post('register')
  register(@Body() params: RegisterDto) {
    return this.authService.register(params);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ResponseMessage('Refresh token successful!')
  refresh(@Req() req: Request) {
    const { sub, refreshToken } = req['user'];
    return this.authService.refreshToken(sub as string, refreshToken as string);
  }

  @Post('forgot-password')
  @ResponseMessage('Password reset email sent!')
  async forgotPassword(@Body() params: ForgotPasswordDto) {
    return this.authService.sendNewPassword(params);
  }

  @Get('roles/:roleId')
  @ResponseMessage('Role retrieved successfully!')
  getRoleById(@Param('roleId') roleId: string) {
    return this.roleService.findById(roleId);
  }
}
