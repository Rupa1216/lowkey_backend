const express = require('express');
const userRouter = express.Router();
const UserService = require('../services/user');

// POST - CREATE 
userRouter.post('/', (req, res, next) => {
    const {username, email} = req.body;

    UserService.create(username, email)
    .then(data => {
        res.json({success: `Created user named ${username} with generated ID: ${data.id}`});
    })
    .catch(err => {
        next(err);
    })
});

module.exports = userRouter;