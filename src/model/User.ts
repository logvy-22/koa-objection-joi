import { Model } from 'objection';
import bcrypt from 'bcrypt';

import Role from './Role';

class User extends Model {
  id!: number;

  firstName?: string;

  lastName?: string;

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
    return this.generateHash();
  }

  $beforeUpdate() {
    return this.generateHash();
  }

  generateHash = async () => {
    this.password = await bcrypt.hash(this.password, 10);
  };
}

export default User;
