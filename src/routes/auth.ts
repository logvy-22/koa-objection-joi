import Koa from 'koa';
import Router from 'koa-router';

import checkValidation from '../middlewares/checkValidation';
import AuthService from '../services/Auth';
import { newUser } from '../validation/user/newUser';
import { userCredentials } from '../validation/user/userCredentials';
import { ValidationProperty } from '../types/ValidationProperty';

const authRouter: Router = new Router();

authRouter.post('/registration', checkValidation({ [ValidationProperty.body]: newUser }), async (ctx: Koa.Context) => {
  try {
    await AuthService.register(ctx.request.body);

    ctx.status = 201;
    ctx.body = 'User created';
  } catch {
    ctx.status = 409;
    ctx.body = 'email already in use';
  }
});

authRouter.post('/login', checkValidation({ [ValidationProperty.body]: userCredentials }), async (ctx: Koa.Context) => {
  try {
    const token = await AuthService.login(ctx.request.body);

    ctx.body = token;
  } catch {
    ctx.status = 401;
  }
});

export default authRouter;
