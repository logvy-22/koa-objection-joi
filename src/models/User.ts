import { Model } from 'objection';
import bcrypt from 'bcrypt';

import Role from './Role';

class User extends Model {
  id!: number;

  first_name?: string;

  last_name?: string;

  email!: number;

  password!: string;

  role_id!: number;

  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role_id',
          to: 'roles.id',
        },
      },
    };
  }

  $beforeInsert() {
    if (this.password) {
      return this.generateHash();
    }
  }

  $beforeUpdate() {
    if (this.password) {
      return this.generateHash();
    }
  }

  generateHash = async () => {
    this.password = await bcrypt.hash(this.password, 10);
  };
}

export default User;
