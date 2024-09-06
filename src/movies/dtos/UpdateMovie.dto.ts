import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  releaseDate: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres: string[];
}
