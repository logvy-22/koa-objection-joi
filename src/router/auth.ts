import Koa from 'koa';
import Router from 'koa-router';
import AuthService from '../service/Auth';

const authRouter: Router = new Router();

authRouter.post('/registration', async (ctx: Koa.Context) => {
  try {
    await AuthService.register(ctx.request.body);
    ctx.status = 201;
    ctx.body = 'User created';
  } catch {
    ctx.status = 409;
    ctx.body = 'email already in use';
  }
});

authRouter.post('/login', async (ctx: Koa.Context) => {
  try {
    const token = await AuthService.login(ctx.request.body);
    ctx.body = token;
  } catch {
    ctx.status = 401;
  }
});

export default authRouter;
