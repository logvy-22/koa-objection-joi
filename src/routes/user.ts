import Koa from 'koa';
import Router from 'koa-router';

import checkJwt from '../middlewares/checkJwt';
import checkRole from '../middlewares/checkRole';
import checkValidation from '../middlewares/checkValidation';
import UserService from '../services/User';
import RoleService from '../services/Role';
import { updateUser } from '../validation/user/updateUser';
import { updateRole } from '../validation/user/updateRole';
import { paginationPayload } from '../validation/paginationPayload';
import { ValidationProperty } from '../types/ValidationProperty';
import { RoleName } from '../types/RoleName';

const userRouter: Router = new Router({
  prefix: '/users',
});

userRouter.use(checkJwt);

userRouter.param('id', async (id: string, ctx: Koa.ParameterizedContext, next) => {
  const user = await UserService.getById(parseInt(id, 10));

  ctx.state.user = user;
  return next();
});

userRouter.get(
  '/',
  checkRole([RoleName.admin]),
  checkValidation({ [ValidationProperty.query]: paginationPayload }),
  async (ctx: Koa.ParameterizedContext) => {
    const response = await UserService.getAll(ctx.request.query);
    ctx.body = response;
  },
);

userRouter.get('/:id(\\d+)', checkRole([RoleName.admin]), async (ctx: Koa.ParameterizedContext) => {
  ctx.body = ctx.state.user;
});

userRouter.delete('/:id(\\d+)', checkRole([RoleName.admin]), async (ctx: Koa.ParameterizedContext) => {
  const { id } = ctx.params;

  await UserService.delete(id);
  ctx.status = 204;
});

userRouter.patch(
  '/:id(\\d+)/change-role',
  checkRole([RoleName.admin]),
  checkValidation({ [ValidationProperty.body]: updateRole }),
  async (ctx: Koa.ParameterizedContext) => {
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
  async (ctx: Koa.ParameterizedContext) => {
    const { id } = ctx.params;
    const { first_name, last_name, email, password } = ctx.request.body;

    const user = await UserService.update(id, { first_name, last_name, email, password });
    ctx.body = user;
  },
);

export default userRouter;
