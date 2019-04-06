const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const admin = require('./firebase');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const attachmentRouter = require('./routes/attachment');
const connectionRouter = require('./routes/connection');
const likeRouter = require('./routes/like');


// MIDDLEWARE NEEDED
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const checkFirebaseToken = (req, res, next) => {
    const { token } = req.body;
  
    admin.auth().verifyIdToken(token)
      .then(function(decodedToken) {
        var uid = decodedToken.uid;
        next();
      }).catch(function(error) {
        // Handle error
        res.json('Error!')
      });
  }

// ROUTES
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/attachments', attachmentRouter);
app.use('/connections', connectionRouter);
app.use('/likes', likeRouter);


app.use((err, req, res, next) => {
    res.status(400).json({error: err.toString()});
});

app.get('/', (req, res) => {
    res.json({'test': true})
})

module.exports = { app, checkFirebaseToken }