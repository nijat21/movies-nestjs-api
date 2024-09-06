import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from './Genres';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  releaseDate: Date;

  @ManyToMany(() => Genre, (genre) => genre.movies, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  genres: Genre[];

  @CreateDateColumn()
  createdAt: Date;
}
