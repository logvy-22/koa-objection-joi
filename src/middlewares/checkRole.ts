import Koa from 'koa';

import Role from '../models/Role';
import RoleService from '../services/Role';
import { RoleName } from '../types/RoleName';

const checkRole = (roleNames: Array<RoleName>) => {
  return async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
    const { roleId } = ctx.state.authorizedUser;

    try {
      const permittedRoles = await RoleService.getByNames(roleNames);

      if (!permittedRoles.find((role: Role) => role.id === roleId)) {
        throw new Error('Access denied');
      }
    } catch (err) {
      ctx.body = 'Forbidden';
      ctx.status = 403;

      return;
    }

    await next();
  };
};

export default checkRole;
