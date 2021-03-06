import * as Knex from 'knex';

export function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.foreign('role_id').references('id').inTable('roles');
  });
}
export function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.dropForeign(['role_id']);
  });
}
