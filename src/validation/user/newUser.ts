import Joi from 'joi';

import { userCredentials } from './userCredentials';

export const newUser = userCredentials.optional().keys({
  first_name: Joi.string().min(2).max(64),
  last_name: Joi.string().min(2).max(64),
});
