import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MovieModule } from './movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { ActorModule } from './actor/actor.module';


@Module({
  imports: [ PrismaModule, MovieModule, ConfigModule.forRoot({
      isGlobal: true,
    }), ActorModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
