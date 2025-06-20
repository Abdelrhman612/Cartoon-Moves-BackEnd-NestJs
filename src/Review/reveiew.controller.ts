import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './Reveiew.service';
import { CreateReviewDto } from './dto/create.reveiew.dto';
import { AuthGuard } from 'src/utils/Auth.Guards';

@Controller('review')
@UseGuards(AuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Post()
  createReview(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get(':movieId')
  getReviewByMovieId(@Param('movieId') movieId: string) {
    return this.reviewService.getReviewByMovieId(movieId);
  }
}
