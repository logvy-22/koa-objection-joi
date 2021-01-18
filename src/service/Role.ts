import Role from '../model/Role';
import { RoleName } from '../types/RoleName';

class RoleService {
  static getByNames(roleNames: Array<RoleName>): Promise<Role[]> {
    return Role.query().where({ name: roleNames });
  }
}

export default RoleService;
