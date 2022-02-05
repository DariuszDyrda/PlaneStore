import * as Joi from 'joi';
import { NODE_ENV } from './constants';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(NODE_ENV))
    .required(),
  PORT: Joi.number().default(8000),
  JWT_SECRET: Joi.string().required(),
  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DB_NAME: Joi.string().required(),
});
