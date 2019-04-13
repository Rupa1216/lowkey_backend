const express = require('express');
const attachmentRouter = express.Router();
const AttachmentService = require('../services/attachment');

// POST - CREATE 
attachmentRouter.post('/', (req, res, next) => {
    const {post_id, user_id, image_url } = req.body;

    AttachmentService.create(post_id, user_id, image_url)
    .then(data => {
        res.json({success: `Created image attachment with generated ID: ${data.id}`});
    })
    .catch(err => {
        next(err);
    })
});

// GET - READ
attachmentRouter.get('/:id', (req, res, next) => {
    const {id} = req.params;

    AttachmentService.read(id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        next(err);
    })
});

// DELETE - DELETE
attachmentRouter.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    
    AttachmentService.delete(id)
        .then(data => {
        res.json({success: `Deleted attachment number ${id}`});
        })
        .catch(err => {
        next(err);
        })
    });

module.exports = attachmentRouter;

