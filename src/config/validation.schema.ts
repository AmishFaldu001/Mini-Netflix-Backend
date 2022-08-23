import * as joi from 'joi';

/**
 * Validation object schema to validate env vars and use the processed values
 */
export const validationSchema = joi.object({
  PORT: joi.number().positive().default(8000),

  SWAGGER_AUTH_USERNAME: joi.string().default('admin'),
  SWAGGER_AUTH_PASSWORD: joi.string().default('4#qo^$R#k22T9!5hT8Em'),
});
