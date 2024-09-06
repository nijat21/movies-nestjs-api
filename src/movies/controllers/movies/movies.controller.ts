import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { UpdateMovieDto } from 'src/movies/dtos/UpdateMovie.dto';
import { MoviesService } from 'src/movies/services/movies/movies.service';

@Controller('movies')
export class MoviesController {
  // Include movies services
  constructor(private movieService: MoviesService) {}

  @Get()
  getMovies() {
    return this.movieService.retrieveMovies();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  addMovie(@Body() userData: CreateMovieDto) {
    return this.movieService.createMovie(userData);
  }

  @Patch(':id')
  updateMovie(
    @Param('id', ParseIntPipe) id: bigint,
    @Body() updateMovieData: UpdateMovieDto,
  ) {
    return this.movieService.modifyMovie(id, updateMovieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id', ParseIntPipe) id: bigint) {
    console.log(id);
  }
}
