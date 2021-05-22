import * as Knex from 'knex';

const tableName = 'favoriteCharacter';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('cod_favorite_character_fch').notNullable().primary();
    t.integer('cod_marvelid_fch').notNullable();
    t.string('str_name_fch', 100).notNullable();
    t.string('str_thumbnail_fch').nullable();
    t.string('str_details_fch').notNullable();
    t.dateTime('dat_liked_fch').notNullable().defaultTo(knex.fn.now());
    t.specificType('cod_user_usr', 'char(36)')
      .notNullable()
      .references('cod_user_usr')
      .inTable('user');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
