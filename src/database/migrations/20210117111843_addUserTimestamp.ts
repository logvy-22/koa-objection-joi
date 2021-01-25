import * as Knex from 'knex';

export function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}
export function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.dropTimestamps();
  });
}
