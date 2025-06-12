import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/DataBase/prisma.service';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}
  async createMovie(createMovieDto: CreateMovieDto) {
    const { title } = createMovieDto;
    const movie = await this.prisma.movie.findFirst({
      where: { title: title },
    });
    if (movie) {
      throw new Error('movie Already exists');
    }
    const AddMovie = await this.prisma.movie.create({ data: createMovieDto });
    return { status: 'success', data: AddMovie };
  }
  async GetMovies() {
    const movies = await this.prisma.movie.findMany();
    return { status: 'success', length: movies.length, data: movies };
  }
  async updateMovie(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.prisma.movie.findUnique({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie is not found');
    }
    const newMovie = await this.prisma.movie.update({
      where: { id: id },
      data: updateMovieDto,
    });
    return { status: 'success', data: newMovie };
  }

  async DeleteMovie(id: string) {
    const movie = await this.prisma.movie.findUnique({ where: { id: id } });
    if (!movie) {
      throw new NotFoundException('Movie is not found');
    }
    await this.prisma.movie.delete({ where: { id: id } });
    return { status: 'success', message: 'delete movie is successfully' };
  }
}
