import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie, MoviePoster } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMovieDto } from 'src/dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        title: true,
        id: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const { title, releaseYear, imageUrl, actorIds } = dto;
    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: actorIds },
      },
    });

    if (!actors || !actors.length) {
      throw new NotFoundException('Актора не знайдено');
    }

    const movie = await this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map(actor => ({
            id: actor.id,
          })),
        },
      },
    });

    return movie;
  }
}
