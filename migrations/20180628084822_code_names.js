exports.up = function(knex, Promise) {
  return knex.schema.createTable('code_names', (table) => {
    table.integer('id').references('id').inTable('assassins').onDelete('cascade');
    table.string('code_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('code_names');
};