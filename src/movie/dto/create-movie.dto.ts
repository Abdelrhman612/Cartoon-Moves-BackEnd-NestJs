import { IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString({ message: 'title must be a string' })
  title: string;
  @IsString({ message: 'description must be a string' })
  description: string;
  @IsUrl({}, { message: 'must be a url' })
  videoUrl: string;
  @IsUrl({}, { message: 'image must be a url' })
  image: string;
}
