import * as Knex from 'knex';

const tableName = 'character';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.string('str_details_cha', 1000)
      .nullable()
      .comment('Details about the character')
      .alter();
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.string('str_details_cha', 1000)
      .notNullable()
      .comment('Details about the character')
      .alter();
  });
}
