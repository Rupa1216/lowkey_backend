const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const userRouter = require('./routes/user');


// MIDDLEWARE NEEDED
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// ROUTES
app.use('/users', userRouter);


module.exports = { app, }