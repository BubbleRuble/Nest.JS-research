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

  async getById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
      include: {
        actors: true,
        poster: true,
      },
    });

    if (!movie || !movie.isAvailable) {
      throw new NotFoundException('Фільм не знайдено');
    }

    return movie;
  }

  async update(id: string, dto: CreateMovieDto): Promise<boolean> {
    const movie = await this.getById(id);

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: dto.actorIds },
      },
    });

    if (!actors || !actors.length) {
      throw new NotFoundException('Актора не знайдено');
    }

    await this.prismaService.movie.update({
      where: {
        id: movie.id,
      },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.imageUrl
          ? {
              create: {
                url: dto.imageUrl,
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

    return true;
  }

  async delete(id: string): Promise<string> {
    const movie = await this.getById(id);

    await this.prismaService.movie.delete({
      where: {
        id: movie.id,
      }
    })

    return movie.id;
  }
}
