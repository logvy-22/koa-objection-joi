import Joi from 'joi';

export const updateRole = Joi.object().keys({
  role_id: Joi.number().integer().required(),
});
