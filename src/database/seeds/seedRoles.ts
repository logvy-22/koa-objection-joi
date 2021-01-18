import * as Knex from 'knex';

import { RoleName } from '../../types/RoleName';

const DEFAULT_ROLES = [
  { id: 1, name: RoleName.user },
  { id: 2, name: RoleName.admin },
];

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();
  await knex('roles').del();
  await knex('roles').insert(DEFAULT_ROLES);
}
