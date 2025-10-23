import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService, type JwtSignOptions  } from '@nestjs/jwt';
import { type MyJwtPayload } from './interfaces/jwt.interface';
import { LoginRequestDto } from 'src/dto/create-login.dto';
import { Request, type Response } from 'express';
import { isDev } from 'src/utils/is-dev.util';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async register(res: Response, dto: CreateUserDto) {
    const { name, email, password } = dto;

    const existUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      throw new ConflictException('User with that email is already exist');
    }

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginRequestDto) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      }
    })

    if(!user) {
      throw new NotFoundException('User not found')
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword) {
      throw new NotFoundException('Incorect password')
    }

    return this.auth(res, user.id)
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if(!refreshToken) {
      throw new UnauthorizedException('Не дійсний рефреш токен')
    }

    const payload: MyJwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if(payload) {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.id,
        },
        select: {
          id: true,
        }
      });

      if(!user) {
        throw new NotFoundException('Користувача не знайдено')
      }

      return this.auth(res, user.id)
    }
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0))
  }

  async validate(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      }
    })

    if(!user) {
      throw new NotFoundException('User not found')
    }

    return user;
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken} = this.generateTokens(id);

    this.setCookie(res, refreshToken, new Date(Date.now() + 1000 * 60 * 60 * 24 *8));

    return {accessToken};
  }

  private generateTokens(id: string) {
    const payload: MyJwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    } as JwtSignOptions)
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    } as JwtSignOptions);

    return {
      accessToken,
      refreshToken,
    }
  }

  private setCookie(res: Response, value: string, expires: Date ) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    })
  }
}
