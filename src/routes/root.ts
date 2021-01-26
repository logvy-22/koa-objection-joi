import Koa from 'koa';
import Router from 'koa-router';

const rootRouter: Router = new Router();

rootRouter.get('/', async (ctx: Koa.ParameterizedContext) => {
  ctx.body = 'Welcome';
});

export default rootRouter;
