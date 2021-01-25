import * as Knex from 'knex';

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('roles', (table) => {
    table.increments('id').primary();
    table.string('name', 45).notNullable();
  });
}
export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('roles');
}
