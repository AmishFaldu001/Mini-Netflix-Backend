import { MovieDto } from "./movie.dto";

export interface MovieSearchDto {
  Search: MovieDto[];
  totalResults: string;
  Response: string;
}
