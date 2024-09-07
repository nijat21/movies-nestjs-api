import { Module } from '@nestjs/common';
import { GenresController } from './controllers/genres/genres.controller';
import { GenresService } from './services/genres/genres.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/typeorm/entities/Genres';
import { Movie } from 'src/typeorm/entities/Movies';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Movie])],
  controllers: [GenresController],
  providers: [GenresService],
  exports: [GenresService],
})
export class GenresModule {}
