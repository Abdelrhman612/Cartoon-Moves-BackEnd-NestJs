import { IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString({ message: 'Content must be a string' })
  content: string;
  @IsString({ message: 'User must be a string' })
  movieId: string;
  @IsString({ message: 'User must be a string' })
  userId: string;
}
