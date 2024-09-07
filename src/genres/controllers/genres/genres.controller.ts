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
import { ApiOperation } from '@nestjs/swagger';
import { CreateGenreDto } from 'src/genres/dtos/CreateGenre.dto';
import { GenresService } from 'src/genres/services/genres/genres.service';

@Controller('genres')
export class GenresController {
  // List genres
  constructor(private genreService: GenresService) {}
  @Get()
  @ApiOperation({ summary: 'List all genres' })
  getGenres() {
    return this.genreService.retrieveGenres();
  }

  // Add genre
  @Post()
  @ApiOperation({ summary: 'Add a new genre' })
  @UsePipes(new ValidationPipe())
  addGenre(@Body() genreData: CreateGenreDto) {
    return this.genreService.createGenre(genreData);
  }

  // Delete genre
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a genre' })
  deleteGenre(@Param('id') id: bigint) {
    return this.genreService.removeGenre(id);
  }
}
