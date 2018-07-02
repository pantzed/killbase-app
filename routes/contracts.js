'use strict'; 

/* eslint-env node */


const express = require('express');
const router = express.Router();
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const knexConfigPath = path.join(__dirname, '../knexfile.js');
const config = require(knexConfigPath)[env];
const knex = require('knex')(config);

router.get('/contracts', (req, res) => {
  knex
  .from('contracts')
  .join('clients', 'contracts.client', '=', 'clients.id')
  .select('clients.name as client_name', 'contracts.id', 'contracts.target', 'contracts.client', 'contracts.budget', 'contracts.complete', 'contracts.completed_by')
  .join('targets', 'contracts.target', '=', 'targets.id')
  .select('targets.name as target_name', 'targets.security', 'targets.location', 'targets.photo')
  .then((x) => {
    res.send(x);
  })
});

router.get('/contracts/:id', (req, res) => {
  knex
  .from('contracts').where('contracts.id', req.params.id)
  .join('clients', 'contracts.client', '=', 'clients.id')
  .select('clients.name as client_name', 'contracts.id', 'contracts.target', 'contracts.client', 'contracts.budget', 'contracts.complete', 'contracts.completed_by')
  .join('targets', 'contracts.target', '=', 'targets.id')
  .select('targets.name as target_name', 'targets.security', 'targets.location', 'targets.photo', 'assassins.id as assassin_id')
  .then((x) => {
    res.send(x);
  })
});

router.get('/contracts.html', (req, res) => {
  if (err) {
    res.sendError(500);
  }
  let contracts = path.join(__dirname, 'public', 'contracts.html');
  res.sendFile(contracts);
});

router.get('/_contract_edit.html', (req, res) => {
  let editContractHTML = path.join(__dirname, 'public', '_contract_edit.html');
  res.sendFile(editContractHTML);
});

router.post('/contracts/:id', (req, res) => {
  knex.from('contracts').where('contracts.id', req.params.id)
  .update({
    target: req.body['target-select'],
    client: req.body['client-name'],
    budget: req.body['price'],
  })
  .then(() => {
    res.redirect('/contracts.html');
  });
});

router.delete('/contracts/:id', (req, res) => {
  knex.from('contracts').where('contracts.id', req.params.id).del()
  .then(() => {
    res.redirect(303, 'contracts.html');
  });
});

module.exports = router;