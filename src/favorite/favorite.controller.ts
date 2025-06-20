import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create.favorite.dto';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  add(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: CreateFavoriteDto,
  ) {
    return this.favoriteService.addFavorite(dto);
  }

  @Get(':userId')
  getUserFavorites(@Param('userId') userId: string) {
    return this.favoriteService.getFavoritesByUser(userId);
  }

  @Delete(':movieId/:userId')
  remove(@Param('movieId') movieId: string, @Param('userId') userId: string) {
    return this.favoriteService.removeFavorite(movieId, userId);
  }
}
