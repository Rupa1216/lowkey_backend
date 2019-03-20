const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// MIDDLEWARE NEEDED
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

module.exports = { app, }