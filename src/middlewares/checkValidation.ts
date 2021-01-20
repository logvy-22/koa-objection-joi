import Koa, { Request } from 'koa';
import { ObjectSchema } from 'joi';

import { ValidationProperty } from '../types/ValidationProperty';

type ValidationSchemaItem = [ValidationProperty, ObjectSchema<any>];
type ValidationSchema = Partial<Record<ValidationProperty, ObjectSchema<any>>>;

const checkValidation = (validationSchema: ValidationSchema) => {
  return async (ctx: Koa.ParameterizedContext, next: Koa.Next): Promise<void> => {
    const requestParams: Request & { [key: string]: any } = ctx.request;
    const joinErrorMessages = (acc: string, [property, validator]: ValidationSchemaItem): string => {
      const { error } = validator!.validate(requestParams[property], { allowUnknown: true });
      if (!error) return acc;
      const { details } = error;

      return acc + details.map(({ message }: { message: string }) => message).join(',');
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
