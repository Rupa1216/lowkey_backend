const express = require('express');
const connectionRouter = express.Router();
const ConnectionService = require('../services/connection');

// POST - CREATE 
connectionRouter.post('/', (req, res, next) => {
    const { follower_id, following_id, status } = req.body;

    ConnectionService.create(follower_id, following_id, status)
    .then(data => {
        res.json({success: `Created connection between ${follower_id} and ${following_id} with generated ID: ${data.id}`});
    })
    .catch(err => {
        next(err);
    })
});

// GET - READ
connectionRouter.get('/:id/', (req, res, next) => {
    const {id} = req.params;

    ConnectionService.read(id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        next(err);
    })
});

// PUT - UPDATE
connectionRouter.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

ConnectionService.update(id, status)
    .then(data => {
        console.log('working?')
    res.json({success: `Updated connection #${id} to status: ${status}`});
    })
    .catch(err => {
        console.log('failing?')
    next(err);
    })
});

module.exports = connectionRouter;