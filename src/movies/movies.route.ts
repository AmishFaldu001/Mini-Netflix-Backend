import { Request, Response, Router } from 'express';
import { routeHandlerWrapper } from '../common/utils/route-handler-wrapper';
import { OGBDApiService } from '../common/ogdb-api/ogdb-api.service';
import { stringValidator } from '../common/validators/string.validator';
import { MoviesService } from './movies.service';
import { numberValidator } from '../common/validators/number.validator';

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

    const page = numberValidator({
      fieldName: 'page number',
      value: req?.query?.page as string,
    })

    const movies = await moviesService.fetchMoviesByName(name, page);
    return res.send(movies);
  }),
);

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
