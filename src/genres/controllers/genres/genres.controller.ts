import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGenreDto } from 'src/movies/dtos/CreateGenre.dto';

@Controller('genres')
export class GenresController {
  // List genres
  @Get()
  getGenres() {}

  // Create a genre
  @Post()
  @UsePipes(new ValidationPipe())
  addGenre(@Body() genreData: CreateGenreDto) {
    console.log(genreData);
  }

  @Delete(':id')
  deleteGenre(@Param('id') id: bigint) {}
}
