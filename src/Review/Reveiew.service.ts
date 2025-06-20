import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import { CreateReviewDto } from './dto/create.reveiew.dto';

@Injectable()
export class ReviewService {
  constructor(readonly prisma: PrismaService) {}
  async createReview(createReviewDto: CreateReviewDto) {
    const { movieId, userId } = createReviewDto;
    const review = await this.prisma.review.findFirst({
      where: { movieId: movieId, userId: userId },
    });
    if (review) {
      throw new Error('Review Already exists');
    }
    const AddReview = await this.prisma.review.create({
      data: createReviewDto,
    });
    return { status: 'success', data: AddReview };
  }
  async getReviewByMovieId(movieId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { movieId: movieId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    return { status: 'success', length: reviews.length, data: reviews };
  }
}
