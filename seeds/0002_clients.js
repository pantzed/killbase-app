exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        {id: 1, name: 'Marcellus Wallace'},
        {id: 2, name: 'Concerto'},
        {id: 3, name: 'Mathilda'},
        {id: 4, name: 'Winston'},
        {id: 5, name: 'Ray Vargo'}
      ]);
    });
};
