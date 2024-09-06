import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from './Movies';

@Entity({ name: 'genres' })
export class Genre {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.genres)
  movies: Movie[];

  @CreateDateColumn()
  createdAt: Date;
}
