import * as express from 'express';
import { authMiddleware } from './common/middlewares/auth.middleware';
import { globalExceptionFilter } from './common/utils/global-exception-filter';
import { moviesRouter } from './movies/movies.route';

export const app = express();

// Consume body in JSON format
app.use(express.json());

// Parse encoded url
app.use(express.urlencoded({ extended: true }));

// Parse incoming query params
app.use(express.query({ parseArrays: true, strictNullHandling: true }));

// Add custom routers
app.use('/movie', authMiddleware, moviesRouter);

// Use global expection filter to properly log and handle exceptions
// NOTE - Use global exception filter after all the routers are loaded
app.use(globalExceptionFilter);
