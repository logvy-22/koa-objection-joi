import _dissoc from 'ramda/src/dissoc';

import User from '../models/User';

class UserService {
  static async getAll(): Promise<User[]> {
    const users = await User.query().orderBy('email');

    return users.map((user) => _dissoc('password', user));
  }

  static async getById(id: number): Promise<User> {
    const user = await User.query().findById(id).throwIfNotFound({
      message: 'User does not exist',
    });

    return _dissoc('password', user);
  }

  static delete(id: number): Promise<number> {
    return User.query().deleteById(id).throwIfNotFound();
  }

  static async update(id: number, options: Partial<User>): Promise<User | number> {
    const user = await User.query().updateAndFetchById(id, options).throwIfNotFound();

    return _dissoc('password', user);
  }
}

export default UserService;
