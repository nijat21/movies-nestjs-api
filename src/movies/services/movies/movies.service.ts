import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { SearchMoviesDto } from 'src/movies/dtos/SearchMovies.dto';
import { UpdateMovieDto } from 'src/movies/dtos/UpdateMovie.dto';
import { Genre } from 'src/typeorm/entities/Genres';
import { Movie } from 'src/typeorm/entities/Movies';
import { Repository } from 'typeorm';
import { Paginated } from 'src/movies/interfaces/movies/movies.interface';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
  ) {}

  // List all movies
  async retrieveMovies(
    page: number = 1,
    limit: number = 10,
  ): Promise<Paginated<Movie>> {
    const [movies, count] = await this.movieRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    if (movies.length === 0) {
      throw new NotFoundException('No movies found');
    }
    return {
      data: movies,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    };
  }

  // Find if the genre exists, if not, create a new one
  async findOrGenerateGenres(genresPassed: string[]): Promise<Genre[]> {
    return Promise.all(
      genresPassed.map(async (name) => {
        let genreFound = await this.genreRepo.findOne({
          where: { name: name.toLocaleLowerCase() },
        });

        if (!genreFound) {
          genreFound = this.genreRepo.create({
            name: name.toLocaleLowerCase(),
          });
          await this.genreRepo.save(genreFound);
        }
        return genreFound;
      }),
    );
  }

  // Add movie
  async createMovie(movieDetails: CreateMovieDto): Promise<Movie> {
    //   Check if movie already exists
    const movieFound = await this.movieRepo.findOne({
      where: { title: movieDetails.title },
    });
    if (movieFound) {
      throw new ConflictException('Movie with this title already exists');
    }

    // Get the genres and add them into the new movie
    const genresFoundOrGenerated = await this.findOrGenerateGenres(
      movieDetails.genres,
    );

    const newMovie = this.movieRepo.create({
      ...movieDetails,
      genres: genresFoundOrGenerated,
    });
    return this.movieRepo.save(newMovie);
  }

  // Update movie
  async modifyMovie(
    id: bigint,
    updatedMovieDetails: UpdateMovieDto,
  ): Promise<Movie> {
    // Find movie
    const movieFound = await this.movieRepo.findOne({
      where: { id },
      relations: ['genres'],
    });
    if (!movieFound) {
      throw new NotFoundException('Movie not found');
    }

    // Updating primitive values if new values inputted for any of those fields
    movieFound.title = updatedMovieDetails.title ?? movieFound.title;
    movieFound.description =
      updatedMovieDetails.description ?? movieFound.description;
    movieFound.releaseDate =
      updatedMovieDetails.releaseDate ?? movieFound.releaseDate;

    // If new genres inputted, add them into the new movie
    if (updatedMovieDetails.genres && updatedMovieDetails.genres.length > 0) {
      const genresFoundOrGenerated = await this.findOrGenerateGenres(
        updatedMovieDetails.genres,
      );
      movieFound.genres = genresFoundOrGenerated;
    }

    return this.movieRepo.save(movieFound);
  }

  // Delete movie
  async removeMovie(id: bigint) {
    // Find movie
    const movieFound = await this.movieRepo.findOne({
      where: { id },
      relations: ['genres'],
    });
    if (!movieFound) {
      throw new NotFoundException('Movie not found');
    }
    await this.movieRepo.remove(movieFound);
    return { message: 'Movie deleted successfully' };
  }

  // Filter movies by genre or title
  async filterMovies(filterInput: SearchMoviesDto): Promise<Movie[]> {
    // Throw error when no input is provided
    // Validation is here despite the DTO, because filter arguments are optional
    if (!filterInput) {
      throw new BadRequestException('No search input provided');
    }

    // Deconstruct
    const { title, genre } = filterInput;

    const fitleredMovies = await this.movieRepo
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.genres', 'genre')
      .where(title ? 'movie.title LIKE :title' : '1=1', {
        title: `%${title}%`,
      })
      .andWhere(genre ? 'genre.name LIKE :genre' : '1=1', {
        genre: `%${genre}%`,
      })
      .getMany();

    return fitleredMovies;
  }
}
