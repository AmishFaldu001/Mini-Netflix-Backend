interface Rating {
  Source: string;
  Value: string;
}

export interface ExpandedMovieDto {
  Title: string;
  Year: number;
  Released: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  BoxOffice: string;
  Type: string;
}
