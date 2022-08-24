import { Request, Response, Router } from 'express';
import { routeHandlerWrapper } from '../common/utils/route-handler-wrapper';
import { OGBDApiService } from '../common/ogdb-api/ogdb-api.service';
import { stringValidator } from '../common/validators/string.validator';
import { MoviesService } from './movies.service';
import { numberValidator } from '../common/validators/number.validator';

export const moviesRouter = Router({ strict: true, mergeParams: true });
const moviesService = new MoviesService(new OGBDApiService());

/**
 * @openapi
 * components:
 *  schemas:
 *    MovieDto:
 *      type: object
 *      properties:
 *        Title:
 *          type: string
 *        Year:
 *          type: string
 *        Poster:
 *          type: string
 *        imdbID:
 *          type: string
 *        Type:
 *          type: string
 * /movie:
 *  get:
 *    description: Fetch movies by name
 *    parameters:
 *      - name: page
 *        in: query
 *        required: true
 *        type: number
 *      - name: name
 *        in: query
 *        required: true
 *        type: string
 *    tags:
 *      - Movie
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Successfully retrieves movies
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                movies:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/MovieDto'
 *                totalResults:
 *                  type: string
 *      400:
 *        desciption: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */

// Fetch movies by name
moviesRouter.get(
  '/',
  routeHandlerWrapper(async (req: Request, res: Response) => {
    const name = stringValidator({
      fieldName: 'movie name',
      value: req?.query?.name as string,
    });

    const page = numberValidator({
      fieldName: 'page number',
      value: req?.query?.page as string,
    })

    const movies = await moviesService.fetchMoviesByName(name, page);
    return res.send(movies);
  }),
);

/**
 * @openapi
 * components:
 *  schemas:
 *    Rating:
 *      type: object
 *      properties:
 *        Source:
 *          type: string
 *        Value:
 *          type: string
 *    ExpandedMovieDto:
 *      type: object
 *      properties:
 *        Title:
 *          type: string
 *        Year:
 *          type: string
 *        Rated:
 *          type: string
 *        Released:
 *          type: string
 *        Runtime:
 *          type: string
 *        Genre:
 *          type: string
 *        Director:
 *          type: string
 *        Writer:
 *          type: string
 *        Actors:
 *          type: string
 *        Language:
 *          type: string
 *        Country:
 *          type: string
 *        Awards:
 *          type: string
 *        Poster:
 *          type: string
 *        Ratings:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Rating'
 *        Metascore:
 *          type: string
 *        imdbRating:
 *          type: string
 *        imdbVotes:
 *          type: string
 *        imdbID:
 *          type: string
 *        Type:
 *          type: string
 *        DVD:
 *          type: string
 *        BoxOffice:
 *          type: string
 *        Production:
 *          type: string
 *        Website:
 *          type: string
 * /movie/{movie-imdb-id}:
 *  get:
 *    description: Fetch movie by id
 *    parameters:
 *      - name: id
 *        description: imdb id of the movie
 *        in: path
 *        required: true
 *        type: string
 *    tags:
 *      - Movie
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Successfully retrieves movies
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ExpandedMovieDto'
 *      400:
 *        desciption: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */

// Fetch a movie details by id
moviesRouter.get(
  '/:id',
  routeHandlerWrapper(async (req: Request, res: Response) => {
    const id = stringValidator({
      fieldName: 'movie id',
      value: req?.params?.id,
    });

    const movies = await moviesService.fetchMovieById(id);
    return res.send(movies);
  }),
);
