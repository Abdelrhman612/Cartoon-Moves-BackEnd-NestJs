import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Roles } from 'src/utils/decorator.role';
import { AuthGuard } from 'src/utils/Auth.Guards';

@Controller('movie')
@UseGuards(AuthGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @Roles(['admin'])
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createMovieDto: CreateMovieDto,
  ) {
    return this.movieService.createMovie(createMovieDto);
  }
  @Get()
  findAll() {
    return this.movieService.GetMovies();
  }
  @Patch(':id')
  @Roles(['admin'])
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(id, updateMovieDto);
  }
  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.movieService.DeleteMovie(id);
  }
}
