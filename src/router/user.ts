import Koa from 'koa';
import Router from 'koa-router';
import _dissoc from 'ramda/src/dissoc';

import { RoleName } from '../types/RoleName';
import checkJwt from '../middlewares/checkJwt';
import checkRole from '../middlewares/checkRole';
import UserService from '../service/User';

const userRouter: Router = new Router({
  prefix: '/users',
});

userRouter.get('/', checkJwt, checkRole([RoleName.admin]), async (ctx: Koa.Context) => {
  const users = await UserService.getAll();
  const formattedUsers = users.map((user) => _dissoc('password', user));

  ctx.body = formattedUsers;
});

userRouter.get('/:id', async (ctx: Koa.Context) => {
  const { id } = ctx.params;
  const user = await UserService.getById(id);

  ctx.body = _dissoc('password', user);
});

userRouter.delete('/:id', async (ctx: Koa.Context) => {
  const { id } = ctx.params;
  await UserService.delete(id);

  ctx.status = 204;
});

// userRouter.patch('/:userId', async (ctx:Koa.Context) => {
//   ctx.body = 'PATCH';
// });

export default userRouter;
