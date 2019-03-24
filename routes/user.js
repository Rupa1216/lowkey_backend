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

// GET - READ 
userRouter.get('/:username/', (req, res, next) => {
    const {username} = req.params;

    UserService.read(username)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        next(err);
    })
});

// PUT - UPDATE EMAIL
userRouter.put('/:username', (req, res, next) => {
    const { username } = req.params;
    const { email} = req.body;
// would token be updated through here?

UserService.update(username, email)
    .then(data => {
    res.json({success: `Updated user named ${username} with email: ${email}`});
    })
    .catch(err => {
    next(err);
    })
});

// DELETE - DELETE
userRouter.delete('/:username', (req, res, next) => {
const {username} = req.params;

UserService.delete(username)
    .then(data => {
    res.json({success: `Deleted user named ${username}`});
    })
    .catch(err => {
    next(err);
    })
});

module.exports = userRouter;