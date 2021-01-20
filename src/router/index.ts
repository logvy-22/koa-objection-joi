import Router from 'koa-router';
import rootRouter from './root';
import userRouter from './user';
import authRouter from './auth';

const api = new Router({ prefix: '/api' });

api.use(rootRouter.routes(), rootRouter.allowedMethods());

api.use(authRouter.routes(), authRouter.allowedMethods());

api.use(userRouter.routes(), userRouter.allowedMethods());
export default api;
