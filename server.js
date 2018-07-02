'use strict'

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const knexConfigPath = path.join(__dirname, 'knexfile.js');
const express = require('express');
const port = process.env.PORT || 5000;

const assassins = require('./routes/assassins');
const contracts = require('./routes/contracts');
const targets = require('./routes/targets');
const clients = require('./routes/targets')

const app = express();

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use(express.static('public')); //Sets static file directory for use with "localhost:8000 in browser"

app.use(assassins);
app.use(contracts);
app.use(clients);
app.use(targets);

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;