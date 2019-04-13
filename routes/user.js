const express = require('express');
const userRouter = express.Router();
const UserService = require('../services/user');


// POST - CREATE 
userRouter.post('/', (req, res, next) => {
    const { fbase_uid, username, email } = req.body;

    UserService.create(fbase_uid, username, email)
        .then(data => {
            res.json({ success: `Created user named ${username} with generated ID: ${data.id}` });
        })
        .catch(err => {
            next(err);
        })
});

// GET - READ BY FBASE_ID
userRouter.get('/id/:fbase_uid', (req, res, next) => {
    const { fbase_uid } = req.params;

    UserService.readId(fbase_uid)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            next(err);
        })
});

// GET - READ BY USERNAME
userRouter.get('/:username', (req, res, next) => {
    const { username } = req.params;

    UserService.read(username)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            next(err);
        })
});

// GET - READ ALL PUBLIC USERS
userRouter.get('/public', (req, res, next) => {

    UserService.allPublicUsers()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            next(err);
        })
});

// PUT - UPDATE EMAIL
userRouter.put('/:fbase_uid', (req, res, next) => {
    const { fbase_uid } = req.params;
    let { username, bio, display_name, email, avatar_url } = req.body;
    UserService.update(username, bio = '', display_name = '', email, avatar_url='')
        .then(data => {
            res.json({ success: `Updated user ${username} with email: ${email}` });
        })
        .catch(err => {
            next(err);
        })
});

// DELETE - DELETE
userRouter.delete('/:fbase_uid', (req, res, next) => {
    const { fbase_uid } = req.params;

    UserService.delete(fbase_uid)
        .then(data => {
            res.json({ success: `Deleted user id ${fbase_uid}` });
        })
        .catch(err => {
            next(err);
        })
});

module.exports = userRouter;