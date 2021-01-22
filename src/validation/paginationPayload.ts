import Joi from 'joi';

export const paginationPayload = Joi.object().keys({
  page: Joi.number(),
  per_page: Joi.number(),
});
