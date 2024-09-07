import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenreDto } from 'src/genres/dtos/CreateGenre.dto';
import { Genre } from 'src/typeorm/entities/Genres';
import { Movie } from 'src/typeorm/entities/Movies';
import { Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
  ) {}

  // Reading all genres
  async retrieveGenres(): Promise<Genre[]> {
    const genresFound = await this.genreRepo.find();
    if (genresFound.length === 0) {
      throw new NotFoundException('Genre not found');
    }
    return genresFound;
  }

  // Adding a genre
  async createGenre(genreData: CreateGenreDto): Promise<Genre> {
    const { name } = genreData;
    //   Check if genre exist
    const genreFound = await this.genreRepo.findOne({
      where: { name: name.toLocaleLowerCase() },
    });

    if (genreFound) {
      throw new ConflictException('Genre already exists');
    }

    const newGenre = this.genreRepo.create({ name: name.toLocaleLowerCase() });
    return this.genreRepo.save(newGenre);
  }

  // Removing a genre
  async removeGenre(id: bigint) {
    const genreFound = await this.genreRepo.findOne({
      where: { id },
      relations: ['movies'],
    });
    if (!genreFound) {
      throw new NotFoundException('Genre not found');
    }

    // Delete genre from genres table
    await this.genreRepo.delete({ id });
    return { message: 'Genre removed successfully' };
  }
}
