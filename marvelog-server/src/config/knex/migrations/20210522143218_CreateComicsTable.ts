import { Knex } from 'knex';

const tableName = 'comic';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.integer('cod_marvelid_com')
      .notNullable()
      .primary()
      .comment("Comic's id from Marvel's API");

    t.string('str_title_com', 100).notNullable().comment("Comic's title");
    t.integer('num_issuenumber_com').nullable().comment("Comic's issue number");

    t.string('str_thumbnail_com', 300)
      .nullable()
      .comment("URL for the comic's thumbnail");

    t.string('str_details_com', 1000)
      .notNullable()
      .comment('Details about the comic');

    t.dateTime('dat_lastmodified_com')
      .notNullable()
      .comment("Date that the comic was last modified in Marvel's API");

    t.dateTime('dat_created_com')
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment('Insert date');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
