import * as dotenv from 'dotenv';
import { validationSchema } from './validation.schema';

dotenv.config();

const response = validationSchema.validate(process.env, {
  abortEarly: false,
  stripUnknown: true
});
if (response.error) {
  throw new Error(response.error.message);
}

process.env = response.value;

export const appConfig = {
  port: process.env.PORT,
};
