import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  releaseDate: Date;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  genres: string[];
}
