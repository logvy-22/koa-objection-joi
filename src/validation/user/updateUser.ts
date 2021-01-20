import Joi from 'joi';

import { userCredentials } from './userCredentials';

export const updateUser = userCredentials
  .keys({
    first_name: Joi.string().trim().min(2).max(64),
    last_name: Joi.string().trim().min(2).max(64),
  })
  .fork(['email', 'password'], (schema) => schema.optional());
