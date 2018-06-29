exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('assassins').del()
    .then(function () {
      // Inserts seed entries
      return knex('assassins').insert([
        {id: 1, name: 'Alexander Duggan', weapon: 'Sniper rifle', age: 31, min_price: 45, rating: 7.5, kills: 28, open_contracts: 1, photo: "https://upload.wikimedia.org/wikipedia/en/e/ec/JackFox.jpg", contact: "assassin@gmail.com"},
        {id: 2, name: 'Anton Chigurh', weapon: 'Pneumatic bolt gun', age: 52, min_price: 40, rating: 9, kills: 72, open_contracts: 2, photo: "http://newsimg.bbc.co.uk/media/images/44356000/jpg/_44356862_bardem.jpg", contact: "assassin@gmail.com"},
        {id: 3, name: 'NULL', weapon: 'Pistol', age: 38, min_price: 20, rating: 6.5, kills: 35, open_contracts: 0, photo: "https://cdn.shopify.com/s/files/1/1270/1769/articles/Depositphotos_38625283_l-1024x678.jpg?v=1496819723", contact: "assassin@gmail.com"},
        {id: 4, name: 'Jason Bourne', weapon: 'Parkour', age: 28, min_price: 25, rating: 7, kills: 48, open_contracts: 2, photo: "https://timedotcom.files.wordpress.com/2016/07/jason-bourne.jpg", contact: "assassin@gmail.com"},
        {id: 5, name: 'John Wick', weapon: 'Lots of guns', age: 35, min_price: 50, rating: 9.5, kills: 433, open_contracts: 1, photo: "https://cdn.movieweb.com/img.news.tops/NEv0SlsjNztUzw_1_b/John-Wick-3-Working-Title-Alpha-Cop-Production.jpg", contact: "assassin@gmail.com"},
        {id: 6, name: 'Jules Winnfield', weapon: 'Pistol', age: 26, min_price: 15, rating: 6.5, kills: 13, open_contracts: 1, photo: "http://0.media.dorkly.cvcdn.com/12/78/da84573bee0661e02964b9180061e787-jules-winnfield.jpg", contact: "assassin@gmail.com"},
        {id: 7, name: 'Leon', weapon: 'Everything', age: 41, min_price: 30, rating: 8.5, kills: 87, open_contracts: 2, photo: "http://exclaim.ca/images/up-leon_the_professional.jpg", contact: "assassin@gmail.com"},
        {id: 8, name: 'Nikita Mears', weapon: 'Silenced pistols', age: 28, min_price: 30, rating: 7, kills: 32, open_contracts: 1, photo: "http://images6.fanpop.com/image/photos/32300000/Nikita-nikita-and-alex-32323804-500-368.jpg", contact: "assassin@gmail.com"},
        {id: 9, name: 'Pickle Rick', weapon: 'Lasers and office supplies', age: 60, min_price: 0, rating: 8, kills: 24, open_contracts: 2, photo: "http://caribgamers.com/wp-content/uploads/2017/08/vlcsnap-2017-08-07-16h36m43s147.png", contact: "assassin@gmail.com"},
      ]);
    });
};