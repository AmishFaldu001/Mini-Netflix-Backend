import axios, { AxiosInstance } from 'axios';
import { appConfig } from '../../config/application.config';
import { MovieSearchDto } from '../../movies/dtos/movie.dto';
import { CustomHttpError } from '../utils/custom-http-error';

/**
 * OGDB api service class connects and fetches data from the ogdb api
 */
export class OGBDApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${appConfig.omdb.baseUrl}/?apiKey=${appConfig.omdb.apiKey}&r=json`,
    });
  }

  /**
   * Fetches movie by name from ogbd api
   * @param movieName - Name of the movie to search for
   * @returns A movie if it is found else undefined
   */
  public async fetchMoviesByName(movieName: string): Promise<MovieSearchDto> {
    try {
      console.info(
        'ogdb-api.service : fetchMoviesByName : Fetching movie with name = ',
        movieName,
      );
      const response = await this.axiosInstance.get(`&s=${movieName}`);
      if (response.data?.Error?.includes('Movie not found')) {
        throw new CustomHttpError({
          message: 'Movie not found!!',
          statuscode: 400,
        });
      }
      return response.data;
    } catch (error) {
      console.error(
        'ogdb-api.service : fetchMoviesByName : Error while fetching movies : ',
        error,
      );
      throw new CustomHttpError({
        message: 'Error while fetching movies',
        statuscode: 500,
      });
    }
  }
}
