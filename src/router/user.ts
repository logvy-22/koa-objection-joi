import Koa from 'koa';
import Router from 'koa-router';
import _dissoc from 'ramda/src/dissoc';
import _pick from 'ramda/src/pick';

import checkJwt from '../middlewares/checkJwt';
import checkRole from '../middlewares/checkRole';
import checkValidation from '../middlewares/checkValidation';
import UserService from '../services/User';
import { updateUser } from '../validation/user/updateUser';
import { updateRole } from '../validation/user/updateRole';
import { ValidationProperty } from '../types/ValidationProperty';
import { RoleName } from '../types/RoleName';
import RoleService from '../services/Role';

const userRouter: Router = new Router({
  prefix: '/users',
});

userRouter.use(checkJwt);

userRouter.param('id', async (id: string, ctx: Koa.ParameterizedContext, next) => {
  const user = await UserService.getById(parseInt(id, 10));

  ctx.state.user = user;
  return next();
});

userRouter.get('/', checkRole([RoleName.admin]), async (ctx: Koa.Context) => {
  const users = await UserService.getAll();
  ctx.body = users;
});

userRouter.get('/:id(\\d+)', checkRole([RoleName.admin]), async (ctx: Koa.Context) => {
  ctx.body = ctx.state.user;
});

userRouter.delete('/:id(\\d+)', checkRole([RoleName.admin]), async (ctx: Koa.Context) => {
  const { id } = ctx.params;

  await UserService.delete(id);
  ctx.status = 204;
});

userRouter.patch(
  '/:id(\\d+)/change-role',
  checkRole([RoleName.admin]),
  checkValidation({ [ValidationProperty.body]: updateRole }),
  async (ctx: Koa.Context) => {
    const { id } = ctx.params;
    const { role_id } = ctx.request.body;

    await RoleService.getById(role_id);
    const user = await UserService.update(id, { role_id });
    ctx.body = user;
  },
);

userRouter.patch(
  '/:id(\\d+)',
  checkRole([RoleName.admin]),
  checkValidation({ [ValidationProperty.body]: updateUser }),
  async (ctx: Koa.Context) => {
    const { id } = ctx.params;
    const { first_name, last_name, email, password } = ctx.request.body;

    const user = await UserService.update(id, { first_name, last_name, email, password });
    ctx.body = user;
  },
);

export default userRouter;
