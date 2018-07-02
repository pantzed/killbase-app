'use strict'; 

/* eslint-env node */


const express = require('express');
const router = express.Router();
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const knexConfigPath = path.join(__dirname, '../knexfile.js');
const config = require(knexConfigPath)[env];
const knex = require('knex')(config);

app.get('/clients', (req, res) => {
  knex('clients')
  .then((things) => {
    res.send(things);
  })
});

module.exports = router;