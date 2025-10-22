import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginRequestDto } from 'src/dto/create-login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto) 
  }

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() dto: LoginRequestDto) {
    return await this.authService.login(dto) 
  }
}

