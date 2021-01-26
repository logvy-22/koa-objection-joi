import Koa from 'koa';
import jwt from 'jsonwebtoken';

import { JWTPayload } from '../types/JWTPayload';

const checkJwt = async (ctx: Koa.ParameterizedContext, next: Koa.Next): Promise<void> => {
  const token = <string>ctx.req.headers.auth;
  let jwtPayload;

  try {
    jwtPayload = <JWTPayload>jwt.verify(token, <string>process.env.JWT_SECRET);
    ctx.state.authorizedUser = jwtPayload;
  } catch (error) {
    ctx.status = 401;
    return;
  }

  const { id, roleId }: JWTPayload = jwtPayload;
  const newToken = jwt.sign({ id, roleId }, <string>process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_LIFE_TIME,
  });

  ctx.set({ auth: newToken });

  await next();
};

export default checkJwt;
