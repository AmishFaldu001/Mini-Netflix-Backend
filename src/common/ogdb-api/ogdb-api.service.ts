import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { OGDBMovieIdResponseDto } from '../../common/ogdb-api/dtos/ogdb-movie-id.response.dto';
import { appConfig } from '../../config/application.config';
import { CustomHttpError } from '../utils/custom-http-error';
import { OGDBMovieSearchResponseDto } from './dtos/ogdb-movie-search.response.dto';

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
   * Fetch movies by name from ogbd api
   * @param movieName - Name of the movie to search for
   * @param page - Page number for pagination
   * @returns A list of movies if found else throws error
   */
  public async fetchMoviesByName(
    movieName: string,
    page: number,
  ): Promise<OGDBMovieSearchResponseDto> {
    let response: AxiosResponse<any, any>;

    try {
      console.info(
        'ogdb-api.service : fetchMoviesByName : Fetching movie with name = ',
        movieName,
      );
      response = await this.axiosInstance.get(`&s=${movieName}&page=${page}`);
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

    if (response.data?.Response === 'False') {
      throw new CustomHttpError({
        message: response.data.Error,
        statuscode: 400,
      });
    }
    return response.data;
  }

  /**
   * Fetches movie by id from ogbd api
   * @returns A movie if found else throws error
   */
  public async fetchMovieById(id: string): Promise<OGDBMovieIdResponseDto> {
    let response: AxiosResponse<any, any>;

    try {
      console.info(
        'ogdb-api.service : fetchMovieById : Fetching movie for id = ',
        id,
      );
      response = await this.axiosInstance.get(`&i=${id}`);
    } catch (error) {
      console.error(
        'ogdb-api.service : fetchMovieById : Error while fetching movie : ',
        error,
      );
      throw new CustomHttpError({
        message: 'Error while fetching movies',
        statuscode: 500,
      });
    }

    if (response.data?.Response === 'False') {
      throw new CustomHttpError({
        message: response.data.Error,
        statuscode: 400,
      });
    }
    return response.data;
  }
}
