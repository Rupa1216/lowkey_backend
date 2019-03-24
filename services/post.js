const { db } = require('./dbConnect');
const PostService = {};

PostService.create = (user_id, created_at, content, attachments) => {
    const sql = `
        INSERT INTO posts (user_id, created_at, content, attachments) 
        VALUES ($[user_id], $[created_at], $[content], $[attachments]) 
        RETURNING id;
        `;
        return db.one(sql, { user_id, created_at, content, attachments })
    }



module.exports = PostService;