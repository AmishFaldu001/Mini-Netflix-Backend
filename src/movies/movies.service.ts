import { OGBDApiService } from '../common/ogdb-api/ogdb-api.service';
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
   * @returns A movie object if found else throws error
   */
  async fetchMoviesByName(
    moviename: string,
  ): Promise<FetchMoviesByNameResponseDto> {
    let movies = await this.ogdbApiService.fetchMoviesByName(moviename);
    console.info(
      'movies.service : fetchMoviesByName : Successfully fetched movies',
    );

    return {
      movies: movies.Search,
      totalResults: movies.totalResults,
    };
  }
}
