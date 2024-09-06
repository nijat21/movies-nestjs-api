import { Module } from '@nestjs/common';
import { GenresController } from './controllers/genres/genres.controller';
import { GenresService } from './services/genres/genres.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/typeorm/entities/Genres';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenresController],
  providers: [GenresService],
  exports: [GenresService],
})
export class GenresModule {}
