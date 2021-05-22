import * as Knex from 'knex';

const tableName = 'favoriteComics';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('cod_favorite_comic_fco').notNullable().primary();
    t.integer('cod_marvelid_fco').notNullable();
    t.string('str_title_fco', 100).notNullable();
    t.integer('num_issuenumber_fco').nullable();
    t.string('str_thumbnail_fco').nullable();
    t.string('str_details_fco').notNullable();
    t.dateTime('dat_liked_fco').notNullable().defaultTo(knex.fn.now());
    t.specificType('cod_user_usr', 'char(36)')
      .notNullable()
      .references('cod_user_usr')
      .inTable('user');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
