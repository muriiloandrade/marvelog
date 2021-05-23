import * as Knex from 'knex';

const tableName = 'favoriteCharacter';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.integer('cod_marvelid_cha')
      .notNullable()
      .references('cod_marvelid_cha')
      .inTable('character')
      .comment("Character's id from character's table");

    t.specificType('cod_user_usr', 'char(36)')
      .notNullable()
      .references('cod_user_usr')
      .inTable('user')
      .comment('Id from the user who liked the character');

    t.primary(['cod_marvelid_cha', 'cod_user_usr']);

    t.dateTime('dat_liked_fch')
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment('Date the user liked the character');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
