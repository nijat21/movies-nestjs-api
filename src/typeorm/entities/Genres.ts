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
  id: bigint;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.genres, { onDelete: 'CASCADE' })
  movies: Movie[];

  @CreateDateColumn()
  createdAt: Date;
}
