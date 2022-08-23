interface MovieDto {
  Title: string;
  Year: number;
  Poster: string;
  imdbID: string;
  Type: string;
}

export interface FetchMoviesByNameResponseDto {
  movies: MovieDto[];
  totalResults: string;
}
