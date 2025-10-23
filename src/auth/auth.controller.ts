import {Body,Controller,Get,HttpCode,HttpStatus,Post,Req,Res,UseGuards,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginRequestDto } from 'src/dto/create-login.dto';
import { type Request, type Response } from 'express';
import {ApiBadRequestResponse,ApiConflictResponse,ApiNotFoundResponse,ApiOkResponse,ApiOperation,ApiUnauthorizedResponse,} from '@nestjs/swagger';
import { AuthResponse } from 'src/dto/auth.dto';
import { Authorization } from 'src/common/decorators/authorization.decorator';
import { Authorized } from 'src/common/decorators/authorized.decorator';
import type { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Creating account',
    description: 'Create an account for user',
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiBadRequestResponse({ description: 'Incorrect data' })
  @ApiConflictResponse({
    description: 'User with this mail already exist',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: CreateUserDto,
  ) {
    return await this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Enter in system',
    description: 'Authorization user and gave access token',
  })
   @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiBadRequestResponse({ description: 'Incorrect data' })
  @ApiNotFoundResponse({description: 'User not found'})
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequestDto,
  ) {
    return await this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Refresh token',
    description: 'Generate new access token',
  })
   @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid refresh token'
  })
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Exit from system',
  })
  @Post('logout')
  @HttpCode(HttpStatus.CREATED)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }

  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized('id') id: string) {
    return {id};
  }
}
