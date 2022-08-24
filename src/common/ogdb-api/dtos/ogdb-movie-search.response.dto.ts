import { MovieDto } from "../../../movies/dtos/movie.dto";

export interface OGDBMovieSearchResponseDto {
  Search: MovieDto[];
  totalResults: string;
  Response: string;
}
