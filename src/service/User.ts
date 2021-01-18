import User from '../model/User';

class UserService {
  static getAll(): Promise<User[]> {
    return User.query().orderBy('email');
  }

  static getById(id: number): Promise<User> {
    return User.query().findById(id).throwIfNotFound();
  }

  static delete(id: number): Promise<number> {
    return User.query().deleteById(id).throwIfNotFound();
  }
}

export default UserService;
