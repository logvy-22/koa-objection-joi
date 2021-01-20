import Koa from 'koa';
import { ValidationError, NotFoundError } from 'objection';

const DEFAULT_NOT_FOUND_MESSAGE = 'NotFoundError';

const errors = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    if (err instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = {
        error: 'ValidationError',
        errors: err.data,
      };
    } else if (err instanceof NotFoundError) {
      ctx.status = 404;
      ctx.body = {
        error: DEFAULT_NOT_FOUND_MESSAGE,
        message: err.message !== DEFAULT_NOT_FOUND_MESSAGE ? err.message : 'Entity not found',
      };
    } else {
      ctx.status = 500;
      ctx.body = { error: 'ServerError', message: err.message };
    }
  }
};

export default errors;
