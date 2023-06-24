import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() { password, username }: AuthLoginDto) {
    const userValidate = await this.authService.validateUser(
      username,
      password,
    );

    if (!userValidate) throw new UnauthorizedException();

    const jwt = await this.authService.generateJwt(userValidate);

    return jwt;
  }
}
