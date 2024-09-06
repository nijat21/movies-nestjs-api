import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { UpdateMovieDto } from 'src/movies/dtos/UpdateMovie.dto';
import { Genre } from 'src/typeorm/entities/Genres';
import { Movie } from 'src/typeorm/entities/Movies';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
  ) {}

  // List all movies
  async retrieveMovies() {
    const moviesList = await this.movieRepo.find();
    if (moviesList.length === 0) {
      return new NotFoundException('No movies found');
    }
    return moviesList;
  }

  // Add movie
  async createMovie(movieDetails: CreateMovieDto) {
    //   Check if movie already exists
    const movieFound = await this.movieRepo.findOne({
      where: { title: movieDetails.title },
    });
    if (movieFound) {
      return new ConflictException('Movie with this title already exists');
    }

    // Get the genres and add them into the new movie
    const genresPassed = movieDetails.genres;
    const genresFoundOrGenerated = await Promise.all(
      genresPassed.map(async (name) => {
        let genreFound = await this.genreRepo.findOne({ where: { name } });

        if (!genreFound) {
          genreFound = this.genreRepo.create({ name });
          await this.genreRepo.save(genreFound);
        }
        return genreFound;
      }),
    );

    const newMovie = this.movieRepo.create({
      ...movieDetails,
      genres: genresFoundOrGenerated,
    });
    return this.movieRepo.save(newMovie);
  }

  // Update movie
  async modifyMovie(id: bigint, updatedMovieDetails: UpdateMovieDto) {
    await this.movieRepo.update({ id }, { ...updatedMovieDetails });
  }

  // Delete movie
  removeMovie() {}
}
