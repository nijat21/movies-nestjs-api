# Movies API

![Cat](https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQSdzE354yA9fsMjuadHmwb0MUhCYo0XH3oL0vZc8-ywGKADwq1y1K-tXp6BW7Ekbpn8AnHDYGbbpp1weUtB5xXINaBjnWDuYUKDcvyFP7UnQ_9D0C6usmZjNq6B9DqFt9dl_5Ii1AzBSl4tnPf6IwURr8NY.jpg?r=eb4)

## Description

Movies API is a Nest JS API fpr managing movies and genres utilizing CRUD operations. The API is deployed in Render (https://movies-nestjs-api.onrender.com) and has MySQL database hosted in AWS. For ease of interacting, it also implements Swagger and can be accessed via https://movies-nestjs-api.onrender.com/api!

## Features

- List, add, update, and delete movies.
- List, add, and delete genres.
- Search movies by title or genre.
- Pagination for movie listings.

## Technologies

- **NestJS**: Framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: Object-Relational Mapper (ORM) for TypeScript and JavaScript.
- **MySQL**: Relational database management system.
- **AWS RDS**: Amazon Web Services Relational Database Service used to manage the MySQL database.
- **Render**: A cloud platform used for deploying and hosting the NestJS application.
- **Swagger**: A tool used for API documentation and testing.

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables.** Create a `.env` file in the root directory with the following content:

   ```env
   DB_HOST=your-db-host
   DB_PORT=3306
   DB_USERNAME=your-db-username
   DB_PASSWORD=your-db-password
   DB_NAME=movies-db
   ```

3. **Run the application:**
   ```bash
   npm run start
   ```

## API Endpoints

### Movies

- **List all movies**

  - `GET /movies`
  - Query parameters: `page` (number), `limit` (number)

- **Add a new movie**

  - `POST /movies`
  - Request body: `CreateMovieDto`

- **Update a movie**

  - `PATCH /movies/:id`
  - Request body: `UpdateMovieDto`

- **Delete a movie**

  - `DELETE /movies/:id`

- **Search movies**
  - `GET /movies/search`
  - Request body: `SearchMoviesDto`

### Genres

- **List all genres**

  - `GET /genres`

- **Add a new genre**

  - `POST /genres`
  - Request body: `CreateGenreDto`

- **Delete a genre**
  - `DELETE /genres/:id`

## Data Models

### Movie

```typescript
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
```

### Genre

```typescript
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
```

## Data Transfer Objects

### CreateMovieDTO

```typescript
export class CreateMovieDto {
  title: string;
  description: string;
  releaseDate: Date;
  genres: string[];
}
```

### UpdateMovieDto

```typescript
export class UpdateMovieDto {
  title?: string;
  description?: string;
  releaseDate?: Date;
  genres?: string[];
}
```

### SearchMovieDto

```typescript
export class SearchMoviesDto {
  title?: string;
  genre?: string;
}
```

### CreateGenreDto

```typescript
export class CreateGenreDto {
  name: string;
}
```
