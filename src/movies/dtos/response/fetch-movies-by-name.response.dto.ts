import { MovieDto } from "../movie.dto";

export interface FetchMoviesByNameResponseDto {
  movies: MovieDto[];
  totalResults: string;
}
