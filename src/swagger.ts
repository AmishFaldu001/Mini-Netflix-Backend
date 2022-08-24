import { Express, NextFunction, Request, Response } from 'express';
import * as swaggerjsdoc from 'swagger-jsdoc';
import * as swaggerui from 'swagger-ui-express';
import { appConfig } from './config/application.config';

/**
 * Fetch auth data from request authorization header
 * @param req Request
 * @returns Object containing username as key and password as value
 */
const fetchAuthData = (req: Request) => {
  if (!req?.headers?.authorization?.length) {
    return {};
  }

  const authToken = Buffer.from(
    req.headers.authorization.split('Basic ')[1],
    'base64',
  ).toString();

  const splittedTokenString = authToken.split(':');
  return { [splittedTokenString[0]]: splittedTokenString[1] };
};

/**
 * Decide whether to allow user with provided auth credentials or not
 * @param authData Object containing username as key and password as value
 * @returns
 */
const allowUser = (authData: Record<string, string>) => {
  if (
    authData[appConfig.swaggerAuth.username] === appConfig.swaggerAuth.password
  ) {
    return true;
  }
  return false;
};

/**
 * Basic username and password authorization before accessing Swagger UI for api docs
 * @returns Either unauthorized response or call next handler in line if user is authorized to access Swagger UI
 */
const swaggerBasicAuth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authData = fetchAuthData(req);
    if (allowUser(authData)) {
      return next();
    }

    res.set('WWW-Authenticate', 'Basic');
    return res.status(401).send();
  };
};

/**
 * Setup swagger ui with route, basic username and password auth to existing express app
 * @param app Express app
 */
export const setupSwagger = (app: Express) => {
  const swaggerDocument = swaggerjsdoc({
    failOnErrors: true,
    definition: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'Mini Netflix Backend',
        description: 'Apis to browse movies',
      },
      security: [{'JwtToken': []}]
    },
    apis: ['./dist/**/*.route.js'],
  });

  app.use(
    '/api-explorer',
    swaggerBasicAuth(),
    swaggerui.serve,
    swaggerui.setup(swaggerDocument, {
      explorer: true,
    }),
  );
};
