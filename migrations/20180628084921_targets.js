exports.up = function(knex, Promise) {
  return knex.schema.createTable('targets', (table) => {
    table.increments();
    table.string('name');
    table.string('location');
    table.string('photo');
    table.integer('security');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('targets');
};