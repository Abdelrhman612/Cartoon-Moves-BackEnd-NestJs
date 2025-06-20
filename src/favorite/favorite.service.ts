import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import { CreateFavoriteDto } from './dto/create.favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(dto: CreateFavoriteDto) {
    return this.prisma.favorite.create({
      data: {
        movieId: dto.movieId,
        userId: dto.userId,
      },
    });
  }

  async getFavoritesByUser(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { movie: true },
    });
  }

  async removeFavorite(movieId: string, userId: string) {
    return this.prisma.favorite.delete({
      where: {
        movieId_userId: {
          movieId,
          userId,
        },
      },
    });
  }
}
