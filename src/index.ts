import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-body';
import helmet from 'koa-helmet';
import Knex from 'knex';
import { Model, ValidationError, NotFoundError } from 'objection';

import router from './router';
import knexConfig from '../knexfile';

const knex = Knex(knexConfig.development);
Model.knex(knex);

const app = new Koa();

app.use(helmet());
app.use(logger());
app.use(
  bodyParser({
    multipart: true,
    urlencoded: true,
  }),
);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = {
        error: 'ValidationError',
        errors: err.data,
      };
    } else if (err instanceof NotFoundError) {
      ctx.status = 404;
      ctx.body = {
        error: 'NotFoundError',
        message: 'Entity not found',
      };
    } else {
      ctx.status = 500;
      ctx.body = { error: 'ServerError', message: err.message };
    }
  }
});

app.use(router());

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(4000);
