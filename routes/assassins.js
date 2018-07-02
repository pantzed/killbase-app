'use strict'; 

/* eslint-env node */


const express = require('express');
const router = express.Router();
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const knexConfigPath = path.join(__dirname, '../knexfile.js');
const config = require(knexConfigPath)[env];
const knex = require('knex')(config);

router.get('/assassins', (req, res) => {
  knex('assassins')
  .join('code_names', 'assassins.id', '=', 'code_names.id')
  .then((assassins) => {
    console.log(assassins);
    res.send(assassins);
  })
});

router.get('/assassins/:id', (req, res) => {
  knex('assassins').where('assassins.id', req.params.id)
  .join('code_names', 'assassins.id', '=', 'code_names.id')
  .then((assassin) => {
    res.send(assassin);
  });
});

router.get('/assassins.html', (req, res) => {
  let assassinsPage = path.join(__dirnamr, 'public', 'assassins.html')
  res.sendStatic(assassinsPage);
});

router.get('/assassins/:id/assassin_profile.html', (req, res) => {
  let asnProfile = path.join(__dirname, 'public', 'assassin_profile.html');
  res.sendFile(asnProfile);
});

router.get('/assassins/:id/contracts', (req, res) => {
  let id = req.params.id;
  knex
  .from('asn_contracts_join').where('asn_contracts_join.asn_id', id)
  .join('assassins', 'asn_contracts_join.asn_id', '=', 'assassins.id')
  .join('contracts', 'asn_contracts_join.contract_id', '=', 'contracts.id')
  .join('clients', 'contracts.client', '=', 'clients.id')
  .join('targets', 'contracts.target', '=', 'targets.id')
  .select('clients.name as client_name', 'targets.name as target_name', 'targets.security', 'targets.location', 'targets.photo', 'contracts.id')
  .then((contracts) => {
    res.send(contracts);
  })
});

router.put('/assassins/:id/edit', (req, res) => {
  let id = req.params.id;
  let updates = {};
  let codeName = {};

  for (let key in req.body) {
    if (req.body[key] !== undefined || req.body[key] !== null) {
      console.log(key, typeof(key))
      if (key === 'code_name') {
        codeName.code_name = req.body[key];
        console.log(codeName);
      }
      else {
        updates[key] = req.body[key];
      }
    }
  }

  knex('assassins').where('id', id)
  .update(updates)
  .then(() => {
   return knex('code_names').where('id', id)
    .update(codeName)
  })
  .then(() => {
    res.redirect('/assassins.html');
  });
});

router.get('/assassins_edit.html', (req, res) => {
  let editAssassinHTML = path.join(__dirname, 'public', '_assassins_edit.html');
  res.sendFile(editAssassinHTML);
})

module.exports = router;
