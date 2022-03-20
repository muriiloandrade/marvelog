import { Knex } from 'knex';

const tableName = 'comic';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dateTime('dat_lastmodified_com')
      .nullable()
      .comment("Date that the comic was last modified in Marvel's API")
      .alter();
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dateTime('dat_lastmodified_com')
      .notNullable()
      .comment("Date that the comic was last modified in Marvel's API")
      .alter();
  });
}
