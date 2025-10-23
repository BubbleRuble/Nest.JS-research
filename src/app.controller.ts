import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowerCasePipe } from './common/pipes/string-to-lowercase.pipe';
import { JwtGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decorators/user-agent.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowerCasePipe)
  @Post()
  create(@Body('title') title: string) {
    return `Movie ${title}`;
  }

  @UseGuards(JwtGuard)
  @Get('@me')
  getProfile(@UserAgent() userAgent: string) {
    return {
      id: 1,
      username: 'Vanya',
      email: 'ivanpetrov@mail.com',
      userAgent,
    };
  }
}
