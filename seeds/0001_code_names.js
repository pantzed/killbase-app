exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('code_names').del()
    .then(function () {
      // Inserts seed entries
      return knex('code_names').insert([
        {id: 1, code_name: 'The Jackal'},
        {id: 2, code_name: 'Old Man'},
        {id: 3, code_name: 'Ghost Dog'},
        {id: 5, code_name: 'Baba Yaga'},
        {id: 7, code_name: 'Old Man'},
        {id: 8, code_name: 'Nikita'},
        {id: 8, code_name: 'La Femme Nikita'},
        {id: 9, code_name: 'Solenya'}
      ]);
    });
};
