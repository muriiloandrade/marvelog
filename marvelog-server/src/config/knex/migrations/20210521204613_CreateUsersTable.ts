import * as Knex from 'knex';

const tableName = 'user';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.uuid('cod_user_usr').primary().notNullable();
    t.string('str_user_usr', 20).notNullable().unique();
    t.string('str_name_usr', 100).notNullable();
    t.string('str_email_usr', 256).notNullable();
    t.string('str_password_usr', 60).notNullable();
    t.string('num_telephone_usr', 11).notNullable();
    t.dateTime('dat_created_usr').notNullable().defaultTo(knex.fn.now());
    t.dateTime('dat_deactivated_usr').notNullable().defaultTo(knex.fn.now());
    t.specificType('bit_active_usr', 'bit');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
