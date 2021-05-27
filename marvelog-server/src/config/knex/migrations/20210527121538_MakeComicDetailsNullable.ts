import * as Knex from 'knex';

const tableName = 'comic';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.string('str_details_com', 1000)
      .nullable()
      .comment('Details about the comic')
      .alter();
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.string('str_details_com', 1000)
      .notNullable()
      .comment('Details about the comic')
      .alter();
  });
}
