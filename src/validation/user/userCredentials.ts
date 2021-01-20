import Joi from 'joi';

export const userCredentials = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: ['com', 'net'] }, minDomainSegments: 2 })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
