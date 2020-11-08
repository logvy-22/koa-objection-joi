import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as logger from 'koa-logger';

const app = new Koa();
const router = new Router();

app.use(logger());

router.get('/', async (ctx) => {
  ctx.body = 'Hello World!';
});

app.use(router.routes());

app.listen(3000);

console.info('Server running on port 3000');