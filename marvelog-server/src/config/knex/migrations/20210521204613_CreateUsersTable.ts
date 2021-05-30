import * as Knex from 'knex';

const tableName = 'user';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.specificType('cod_user_usr', 'char(36)')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('UUID()'));

    t.string('str_user_usr', 20).notNullable().unique();
    t.string('str_name_usr', 100).notNullable();
    t.string('str_email_usr', 256).notNullable().unique();
    t.string('str_password_usr', 60).notNullable();
    t.string('num_telephone_usr', 11).notNullable();
    t.dateTime('dat_created_usr').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
