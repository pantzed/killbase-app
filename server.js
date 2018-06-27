'use strict'

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const knexConfigPath = path.join(__dirname, 'knexfile.js');
const env = 'development';
const config = require(knexConfigPath)[env];
const knex = require('knex')(config);
const express = require('express');

const port = process.env.PORT || 8000;


const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());

app.use(express.static('public')); //Sets static file directory for use with "localhost:8000 in browser"

app.get('/assassins', (req, res) => {
  knex('assassins').then((x) => {
    res.send(x);
  })
});

app.get('/contracts', (req, res) => {
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

app.get('/contracts/:id', (req, res) => {
  console.log(req.body.id);
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

app.get('/contracts/:id/edit', (req, res) => {
  let editContractHTML = path.join(__dirname, 'public', '_contract_edit.html');
  res.sendFile(editContractHTML);
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;