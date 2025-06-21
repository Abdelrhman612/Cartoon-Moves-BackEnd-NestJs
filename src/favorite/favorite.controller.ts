import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Get,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create.favorite.dto';

import { Request } from 'express';
import { AuthGuard } from 'src/utils/Auth.Guards';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(AuthGuard)
  @Post()
  add(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: CreateFavoriteDto,
    @Req() req: Request,
  ) {
    const userId = (req['user'] as { id: string } | undefined)?.id;
    if (!userId) {
      throw new Error('User ID not found in request');
    }
    return this.favoriteService.addFavorite(dto, userId);
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
