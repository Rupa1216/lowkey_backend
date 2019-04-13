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

// GET - READ BY ID
connectionRouter.get('/:id', (req, res, next) => {
    const {id} = req.params;

    ConnectionService.read(id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        next(err);
    })
});

// GET - READ ALL FRIENDS
connectionRouter.get('/:id/all', (req, res, next) => {
    const {id} = req.params;

    ConnectionService.readAll(id)
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
    res.json({success: `Updated connection #${id} to status: ${status}`});
    })
    .catch(err => {
    next(err);
    })
});

// DELETE - DELETE
connectionRouter.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    
    ConnectionService.delete(id)
        .then(data => {
        res.json({success: `Deleted connection #${id}`});
        })
        .catch(err => {
        next(err);
        })
    });

module.exports = connectionRouter;