import { Request, Response, Router } from 'express';
import { routeHandlerWrapper } from '../common/utils/route-handler-wrapper';
import { OGBDApiService } from '../common/ogdb-api/ogdb-api.service';
import { stringValidator } from '../common/validators/string.validator';
import { MoviesService } from './movies.service';

export const moviesRouter = Router({ strict: true, mergeParams: true });
const moviesService = new MoviesService(new OGBDApiService());

// Fetch movies by name
moviesRouter.get(
  '/',
  routeHandlerWrapper(async (req: Request, res: Response) => {
    const name = stringValidator({
      fieldName: 'movie name',
      value: req?.query?.name as string,
    });

    const movie = await moviesService.fetchMoviesByName(name);
    return res.send(movie);
  }),
);

// Fetch latest movies
moviesRouter.get('/recent');

// Fetch a movie details by id
moviesRouter.get('/:id');
