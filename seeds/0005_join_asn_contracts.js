exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('asn_contracts_join').del()
    .then(function () {
      // Inserts seed entries
      return knex('asn_contracts_join').insert([
        {asn_id: 1, contract_id: 5},
        {asn_id: 2, contract_id: 1},
        {asn_id: 5, contract_id: 2},
        {asn_id: 7, contract_id: 3},
        {asn_id: 9, contract_id: 5},
        {asn_id: 6, contract_id: 4},
        {asn_id: 3, contract_id: 1}
      ]);
    });
};
