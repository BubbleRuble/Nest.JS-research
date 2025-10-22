import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
// import { MovieModule } from './movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { ActorModule } from './actor/actor.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ PrismaModule, ActorModule, ReviewModule, ConfigModule.forRoot({
      isGlobal: true,
    }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
