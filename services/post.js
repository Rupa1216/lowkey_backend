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

PostService.read = (id) => {
    const sql = `
    SELECT 
    p.created_at, p.content, p.attachments,
    u.username
    FROM posts p
    LEFT JOIN users u
    ON p.user_id = u.id
    WHERE
    p.id = $[id]
    `;
    return db.one(sql, {});
}

module.exports = PostService;