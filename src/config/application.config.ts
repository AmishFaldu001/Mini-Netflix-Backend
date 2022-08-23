import * as dotenv from 'dotenv';
import { validationSchema } from './validation.schema';

// Load .env file variables
dotenv.config();

const response = validationSchema.validate(process.env, {
  abortEarly: false,
  stripUnknown: true,
});

// Joi validation found errors in env vars
// So throw a new error
if (response.error) {
  throw new Error(response.error.message);
}

// Override the env vars which are processed by joi
process.env = {
  ...process.env,
  ...response.value,
};

/**
 * Application config object used to determine which env vars are used by this app
 */
export const appConfig = {
  port: process.env.PORT,
  swaggerAuth: {
    username: process.env.SWAGGER_AUTH_USERNAME,
    password: process.env.SWAGGER_AUTH_PASSWORD,
  },
};
