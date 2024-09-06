import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenreDto } from 'src/movies/dtos/CreateGenre.dto';
import { Genre } from 'src/typeorm/entities/Genres';
import { Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(@InjectRepository(Genre) private genreRepo: Repository<Genre>) {}

  async retrieveGenres() {
    const genresFound = await this.genreRepo.find();
    if (genresFound.length === 0) {
      throw new NotFoundException('Genre not found');
    }
    return genresFound;
  }

  async createGenre(genreData: CreateGenreDto) {
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
}
