import { Knex } from 'knex';

const tableName = 'character';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dateTime('dat_lastmodified_cha')
      .nullable()
      .comment("Date that the character was last modified in Marvel's API")
      .alter();
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dateTime('dat_lastmodified_cha')
      .notNullable()
      .comment("Date that the character was last modified in Marvel's API")
      .alter();
  });
}
