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

module.exports = attachmentRouter;

