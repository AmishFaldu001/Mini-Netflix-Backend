import * as joi from 'joi';

/**
 * Validation object schema to validate env vars and use the processed values
 */
export const validationSchema = joi.object({
  PORT: joi.number().positive().default(8000),

  // Swagger auth to authorize access to swagger ui
  SWAGGER_AUTH_USERNAME: joi.string().default('admin'),
  SWAGGER_AUTH_PASSWORD: joi.string().default('4#qo^$R#k22T9!5hT8Em'),

  // Secret token used to authorize the request to server
  JWT_SECRET_TOKEN: joi.string().required(),

  // OMDB api vars
  OMDB_BASE_URL: joi.string().default('http://www.omdbapi.com'),
  OMDB_API_KEY: joi.string().required(),
});
