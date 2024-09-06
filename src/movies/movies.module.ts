import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies/movies.controller';
import { MoviesService } from './services/movies/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/typeorm/entities/Movies';
import { Genre } from 'src/typeorm/entities/Genres';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
