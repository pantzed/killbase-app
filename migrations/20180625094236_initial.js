exports.up = function(knex, Promise) {
  return knex.schema.createTable('assassins', (table) => {
    table.increments();
    table.string('name');
    table.integer('age');
    table.string('weapon');
    table.integer('min_price');
    table.float('rating');
    table.integer('kills');
    table.integer('open_contracts');
    table.string('photo');
    table.string('contact');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('assassins');
};
