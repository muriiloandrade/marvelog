import { Knex } from 'knex';

const tableName = 'character';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    t.dropColumn('str_resource_cha');
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, (t) => {
    return t
      .string('str_resource_cha', 300)
      .nullable()
      .comment("URL for the character's resource");
  });
}
