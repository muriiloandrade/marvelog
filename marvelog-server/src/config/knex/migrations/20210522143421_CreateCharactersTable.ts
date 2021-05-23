import * as Knex from 'knex';

const tableName = 'character';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.integer('cod_marvelid_cha')
      .notNullable()
      .primary()
      .comment("Character's id from Marvel's API");

    t.string('str_name_cha', 100).notNullable().comment("Character's name");

    t.string('str_thumbnail_cha', 300)
      .nullable()
      .comment("URL for the character's thumbnail");

    t.string('str_details_cha', 1000)
      .notNullable()
      .comment('Details about the character');

    t.dateTime('dat_lastmodified_cha')
      .notNullable()
      .comment("Date that the comic was last modified in Marvel's API");

    t.dateTime('dat_created_cha')
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment('Insert date');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
