import Koa, { Request } from 'koa';
import { ObjectSchema, ValidationErrorItem } from 'joi';

import { ValidationProperty } from '../types/ValidationProperty';

const DEFAULT_VALIDATOR_OPTIONS = { allowUnknown: true, abortEarly: false };

type ValidationSchemaItem = [ValidationProperty, ObjectSchema<any>];

type ValidationSchema = Partial<Record<ValidationProperty, ObjectSchema<any>>>;

const checkValidation = (validationSchema: ValidationSchema) => {
  return async (ctx: Koa.ParameterizedContext, next: Koa.Next): Promise<void> => {
    const requestParams: Request & { [key: string]: any } = ctx.request;

    const joinErrorMessages = (acc: string, [property, validator]: ValidationSchemaItem): string => {
      const { error } = validator!.validate(requestParams[property], DEFAULT_VALIDATOR_OPTIONS);
      if (!error) return acc;

      return acc + error.details.map(({ message }: ValidationErrorItem) => message).join(',');
    };

    const validation = <ValidationSchemaItem[]>Object.entries(validationSchema);
    const errorMessage = validation.reduce(joinErrorMessages, '');

    if (!errorMessage.length) {
      await next();
    } else {
      ctx.statusCode = 400;
      ctx.body = { error: 'ValidationError', message: errorMessage };
    }
  };
};

export default checkValidation;
