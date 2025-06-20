import { IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString({ message: 'Movie ID must be a string' })
  movieId: string;

  @IsString({ message: 'User ID must be a string' })
  userId: string;
}
