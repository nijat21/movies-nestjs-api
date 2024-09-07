import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { SearchMoviesDto } from 'src/movies/dtos/SearchMovies.dto';
import { UpdateMovieDto } from 'src/movies/dtos/UpdateMovie.dto';
import { MoviesService } from 'src/movies/services/movies/movies.service';
import { ApiQuery, ApiOperation } from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
  // Include movies services
  constructor(private movieService: MoviesService) {}

  // List movies
  @Get()
  @ApiOperation({ summary: 'List all movies' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of movies per page',
  })
  getMovies(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.movieService.retrieveMovies(page, limit);
  }

  // Add movie
  @Post()
  @ApiOperation({ summary: 'Add a new movie' })
  @UsePipes(new ValidationPipe())
  addMovie(@Body() userData: CreateMovieDto) {
    return this.movieService.createMovie(userData);
  }

  // Update movie
  @Patch(':id')
  @ApiOperation({ summary: 'Update a movie' })
  @UsePipes(new ValidationPipe())
  updateMovie(
    @Param('id', ParseIntPipe) id: bigint,
    @Body() updateMovieData: UpdateMovieDto,
  ) {
    return this.movieService.modifyMovie(id, updateMovieData);
  }

  // Delete movie
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  deleteMovie(@Param('id', ParseIntPipe) id: bigint) {
    return this.movieService.removeMovie(id);
  }

  // // Search movies
  @Get('search')
  @ApiOperation({ summary: 'Search movies' })
  @UsePipes(new ValidationPipe())
  searchMovies(@Query() searchMoviesData: SearchMoviesDto) {
    return this.movieService.filterMovies(searchMoviesData);
  }
}
