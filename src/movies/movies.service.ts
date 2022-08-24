import { OGBDApiService } from '../common/ogdb-api/ogdb-api.service';
import { ExpandedMovieDto } from './dtos/expanded-movie.dto';
import { FetchMoviesByNameResponseDto } from './dtos/response/fetch-movies-by-name.response.dto';

/**
 * Movies service to search for movies.
 *
 * A common interface service used to fetch movies using OGDB api service
 */
export class MoviesService {
  constructor(private ogdbApiService: OGBDApiService) {}

  /**
   * Fetches movie by name
   * @param moviename - Movie name to search for
   * @page - Page number for pagination
   * @returns A list of movies if found else throws error
   */
  async fetchMoviesByName(
    moviename: string,
    page: number,
  ): Promise<FetchMoviesByNameResponseDto> {
    let movies = await this.ogdbApiService.fetchMoviesByName(moviename, page);
    console.info(
      'movies.service : fetchMoviesByName : Successfully fetched movies',
    );

    return {
      movies: movies.Search,
      totalResults: movies.totalResults,
    };
  }

  /**
   * Fetches recently released movies
   * @returns A list of movies released recently or an empty array if no movies released recently
   */
  async fetchMovieById(id: string): Promise<ExpandedMovieDto> {
    let movie = await this.ogdbApiService.fetchMovieById(id);
    console.info(
      'movies.service : fetchMovieById : Successfully fetched movie for id = ',
      id,
    );

    // Remove response field as it is not a necessary field to send
    delete movie.Response;
    return movie;
  }
}
