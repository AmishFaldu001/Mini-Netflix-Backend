import * as joi from 'joi';

export const validationSchema = joi.object({
  PORT: joi.number().positive().default(8000),
});
