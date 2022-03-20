import { Knex } from 'knex';

const tableName = 'favoriteComic';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.integer('cod_marvelid_com')
      .notNullable()
      .references('cod_marvelid_com')
      .inTable('comic')
      .comment("Comic's id from comic's table");

    t.specificType('cod_user_usr', 'char(36)')
      .notNullable()
      .references('cod_user_usr')
      .inTable('user')
      .comment('Id from the user who liked the comic');

    t.primary(['cod_marvelid_com', 'cod_user_usr']);

    t.dateTime('dat_liked_fco')
      .notNullable()
      .defaultTo(knex.fn.now())
      .comment('Date the user liked the comic');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
