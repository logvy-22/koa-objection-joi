import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWTPayload } from '../types/JWTPayload';
import User from '../model/User';

class AuthService {
  static async register(user: User): Promise<User> {
    return User.query().insert({
      ...user,
      role_id: 1,
    });
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
