import { IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString({ message: 'Movie ID must be a string' })
  movieId: string;
}
