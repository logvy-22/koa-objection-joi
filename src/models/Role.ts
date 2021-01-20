import { Model } from 'objection';

class Role extends Model {
  id!: number;

  name!: string;

  static get tableName() {
    return 'roles';
  }
}

export default Role;
