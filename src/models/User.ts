import { Model } from 'objection';
import bcrypt from 'bcrypt';

import Room from './Room';
import Role from './Role';

class User extends Model {
  id!: number;

  first_name?: string;

  last_name?: string;

  email!: number;

  password!: string;

  role_id!: number;

  static tableName = 'users';

  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: Role,
      join: {
        from: 'users.role_id',
        to: 'roles.id',
      },
    },
  };

  $beforeInsert(): any {
    if (this.password) {
      return this.generateHash();
    }
    return null;
  }

  $beforeUpdate(): any {
    if (this.password) {
      return this.generateHash();
    }
    return null;
  }

  generateHash = async () => {
    this.password = await bcrypt.hash(this.password, 10);
  };
}

export default User;
