const express = require('express');
const postRouter = express.Router();
const PostService = require('../services/post');

// POST - CREATE 
postRouter.post('/', (req, res, next) => {
    const {user_id, created_at, content, attachments} = req.body;

    PostService.create(user_id, created_at, content, attachments)
    .then(data => {
        res.json({success: `Created post for ${user_id} with generated id: ${data.id}`});
    })
    .catch(err => {
        next(err);
    })
});

module.exports = postRouter;
