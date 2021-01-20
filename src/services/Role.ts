import Role from '../models/Role';
import { RoleName } from '../types/RoleName';

class RoleService {
  static getByNames(roleNames: Array<RoleName>): Promise<Role[]> {
    return Role.query().where({ name: roleNames });
  }

  static getById(id: number): Promise<Role> {
    return Role.query().findById(id).throwIfNotFound({
      message: 'Role does not exist',
    });
  }
}

export default RoleService;
