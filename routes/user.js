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
userRouter.get('/:id/', (req, res, next) => {
    const {id} = req.params;

    UserService.read(id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        next(err);
    })
});

// PUT - UPDATE EMAIL
userRouter.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { username, email} = req.body;

UserService.update(id, username, email)
    .then(data => {
    res.json({success: `Updated user named ${username} with email: ${email}`});
    })
    .catch(err => {
    next(err);
    })
});

// DELETE - DELETE
userRouter.delete('/:id', (req, res, next) => {
const { id } = req.params;

UserService.delete(id)
    .then(data => {
    res.json({success: `Deleted user id ${id}`});
    })
    .catch(err => {
    next(err);
    })
});

module.exports = userRouter;