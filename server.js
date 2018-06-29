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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public')); //Sets static file directory for use with "localhost:8000 in browser"

app.get('/assassins/:id', (req, res) => {
  knex('assassins').where('assassins.id', req.params.id)
  .join('code_names', 'assassins.id', '=', 'code_names.id')
  .then((assassin) => {
    console.log(assassin);
    res.send(assassin);
  });
});

app.get('/assassins', (req, res) => {
  knex('assassins').join('code_names', 'assassins.id', '=', 'code_names.id')
  .then((things) => {
    res.send(things);
  })
});

app.get('/assassin_profile.html', (req, res) => {
  let asnProfile = path.join(__dirname, 'public', 'assassin_profile.html');
  res.sendFile(asnProfile);
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
  knex
  .from('contracts').where('contracts.id', req.params.id)
  .join('clients', 'contracts.client', '=', 'clients.id')
  .select('clients.name as client_name', 'contracts.id', 'contracts.target', 'contracts.client', 'contracts.budget', 'contracts.complete', 'contracts.completed_by')
  .join('targets', 'contracts.target', '=', 'targets.id')
  .select('targets.name as target_name', 'targets.security', 'targets.location', 'targets.photo')
  .then((x) => {
    res.send(x);
  })
});

app.get('/contracts.html', (req, res) => {
  let contracts = path.join(__dirname, 'public', 'contracts.html');
  res.sendFile(contracts);
});

app.get('/_contract_edit.html', (req, res) => {
  let editContractHTML = path.join(__dirname, 'public', '_contract_edit.html');
  res.sendFile(editContractHTML);
});

app.get('/targets', (req, res) => {
  knex('targets')
  .then((things) => {
    res.send(things);
  });
});

app.get('/clients', (req, res) => {
  knex('clients')
  .then((things) => {
    res.send(things);
  })
});

app.get('/assassins_edit.html', (req, res) => {
  let editAssassinHTML = path.join(__dirname, 'public', '_assassins_edit.html');
  res.sendFile(editAssassinHTML);
})

app.post('/contracts/:id', (req, res) => {
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

app.delete('/contracts/:id', (req, res) => {
  console.log('deleting...');
  knex.from('contracts').where('contracts.id', req.params.id).del()
  .then(() => {
    console.log('Deleted!')
    res.redirect(303, 'contracts.html');
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;