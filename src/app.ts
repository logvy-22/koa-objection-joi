import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-body';
import helmet from 'koa-helmet';

import errorsHandler from './middlewares/errors';
import router from './routes';

const app = new Koa();

app.use(helmet());
app.use(logger());
app.use(
  bodyParser({
    multipart: true,
    urlencoded: true,
  }),
);

app.use(errorsHandler);

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

export default app;
