const express = require('express');
const likeRouter = express.Router();
const LikeService = require('../services/connection');

// POST - CREATE 
likeRouter.post('/', (req, res, next) => {
    const { user_id, post_id } = req.body;

    LikeService.create(user_id, post_id)
    .then(data => {
        res.json({success: `User #${user_id} liked post #${post_id} with generated ID: ${data.id}`});
    })
    .catch(err => {
        next(err);
    })
});

module.exports = likeRouter;