import * as Koa from 'koa';

import Role from '../model/Role';
import RoleService from '../service/Role';
import { RoleName } from '../types/RoleName';

const checkRole = (roleNames: Array<RoleName>) => {
  return async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
    const { roleId } = ctx.state.user;

    try {
      const permittedRoles = await RoleService.getByNames(roleNames);

      if (!permittedRoles.find((role: Role) => role.id === roleId)) {
        throw new Error('Access denied');
      }

      await next();
    } catch (err) {
      ctx.status = 403;
      ctx.body = 'Forbidden';
    }
  };
};

export default checkRole;
