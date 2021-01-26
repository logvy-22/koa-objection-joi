import * as Knex from 'knex';

export function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('rooms', (table) => {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.boolean('is_private').notNullable();
    })
    .createTable('messages', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
      table.integer('room_id').unsigned().references('id').inTable('rooms').onUpdate('CASCADE').onDelete('CASCADE');
      table.text('message', 'longtext').notNullable();
    })
    .createTable('participants', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
      table.integer('room_id').unsigned().references('id').inTable('rooms').onUpdate('CASCADE').onDelete('CASCADE');
    });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages').dropTable('participants').dropTable('rooms');
}
