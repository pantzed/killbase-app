exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('targets').del()
    .then(function () {
      // Inserts seed entries
      return knex('targets').insert([
        {id: 1, name: 'Butch Coolidge', location: 'Los Angeles', photo: 'https://goo.gl/LCquZj', security: 3},
        {id: 2, name: 'The Jaguar', location: 'Russian Embassy', photo: 'https://goo.gl/6JWsiv', security: 9},
        {id: 3, name: 'Norman Stansfield', location: 'Manhattan', photo: 'https://i.imgur.com/mdIk33E.jpg', security: 7},
        {id: 4, name: 'Santino DAntonio', location: 'Continental Hotel', photo: 'https://goo.gl/fUPkYy', security: 10},
        {id: 5, name: 'Sonny Valerio', location: 'Queens', photo: 'https://goo.gl/8DHYUS', security: 4}
      ]);
    });
};
