import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie, MoviePoster, Review } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateReviewDto } from 'src/dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        text: true,
        id: true,
      },
    });
  }

  async create(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;

    const review = await this.prismaService.review.create({
      data: {
        text,
        rating,
        movie: { connect: { id: movieId } },
      },
    });

    return review;
  }
}
