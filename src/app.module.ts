import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './typeorm/entities/Movies';
import { Genre } from './typeorm/entities/Genres';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'jamesbondreturns',
      database: 'movies_db',
      entities: [Movie, Genre],
      synchronize: true,
    }),
    MoviesModule,
    GenresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
