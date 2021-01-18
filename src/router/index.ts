import combineRouters from 'koa-combine-routers';

import rootRouter from './root';
import userRouter from './user';
import authRouter from './auth';

const router = combineRouters(rootRouter, userRouter, authRouter);

export default router;
