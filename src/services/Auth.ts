import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _pick from 'ramda/src/pick';
import _dissoc from 'ramda/src/dissoc';

import User from '../models/User';
import { JWTPayload } from '../types/JWTPayload';

class AuthService {
  static async register(user: Partial<User>): Promise<User> {
    const userData = _pick(['email', 'first_name', 'last_name', 'password'], user);

    const dbUser = await User.query().insertAndFetch({
      ...userData,
      role_id: 1,
    });

    return _dissoc('password', dbUser);
  }

  static async login(user: Partial<User>): Promise<{ token: string }> {
    const { email, password } = user;
    const dbUser = await User.query().findOne({ email });

    if (!dbUser || !(await bcrypt.compare(password, dbUser.password))) {
      throw new Error('Invalid credentials');
    }

    const jwtPayload: JWTPayload = { id: dbUser.id, roleId: dbUser.role_id };
    const token = jwt.sign(jwtPayload, <string>process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_LIFE_TIME });

    return { token };
  }
}

export default AuthService;
