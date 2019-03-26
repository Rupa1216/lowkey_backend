const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const attachmentRouter = require('./routes/attachment');
const connectionRouter = require('./routes/connection');


// MIDDLEWARE NEEDED
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// ROUTES
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/attachments', attachmentRouter);
app.use('/connections', connectionRouter);



app.use((err, req, res, next) => {
    res.status(400).json({error: err.toString()});
});

module.exports = { app, }