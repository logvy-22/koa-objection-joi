import { Model } from 'objection';

class Role extends Model {
  id!: number;

  name!: string;

  static tableName = 'roles';
}

export default Role;
