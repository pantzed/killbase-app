exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contracts').del()
    .then(function () {
      // Inserts seed entries
      return knex('contracts').insert([
        {id: 1, target: 1, client: 1, budget: 40, complete: 'FALSE', completed_by: null},
        {id: 2, target: 2, client: 2, budget: 70, complete: 'FALSE', completed_by: null},
        {id: 3, target: 3, client: 3, budget: 35, complete: 'FALSE', completed_by: null},
        {id: 4, target: 4, client: 4, budget: 25, complete: 'FALSE', completed_by: null},
        {id: 5, target: 5, client: 5, budget: 10, complete: 'FALSE', completed_by: null},
      ]);
    });
};
