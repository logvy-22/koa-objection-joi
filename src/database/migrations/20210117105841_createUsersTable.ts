import * as Knex from 'knex';

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('first_name');
    table.string('last_name');
    table.string('password').notNullable();
    table.integer('role_id').unsigned();
  });
}
export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
