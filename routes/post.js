const express = require('express');
const postRouter = express.Router();
const PostService = require('../services/post');

// POST - CREATE 
postRouter.post('/', (req, res, next) => {
    const {user_id, content} = req.body;

    PostService.create(user_id, content)
    .then(data => {
        res.json({success: `Created post for user ${user_id} with generated id: ${data.id}`});
    })
    .catch(err => {
        next(err);
    })
});

// GET - READ 
postRouter.get('/:id/', (req, res, next) => {
    const {id} = req.params;

    PostService.read(id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        next(err);
    })
});

// PUT - UPDATE
postRouter.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { content } = req.body;

PostService.update(content, id)
    .then(data => {
    res.json({success: `Updated post number ${id} with content: ${content}`});
    })
    .catch(err => {
    next(err);
    })
});

// DELETE - DELETE
postRouter.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    
    PostService.delete(id)
        .then(data => {
        res.json({success: `Deleted post number ${id}`});
        })
        .catch(err => {
        next(err);
        })
    });

module.exports = postRouter;
