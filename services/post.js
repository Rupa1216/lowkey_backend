const { db } = require('./dbConnect');
const PostService = {};

PostService.create = (user_id, created_at, content) => {
    const sql = `
        INSERT INTO posts (user_id, created_at, content) 
        VALUES ($[user_id], $[created_at], $[content]) 
        RETURNING id;
        `;
        return db.one(sql, { user_id, created_at, content })
    }

PostService.read = (id) => {
    const sql = `
    SELECT 
    p.created_at, p.content,
    u.username
    FROM posts p
    LEFT JOIN users u
    ON p.user_id = u.id
    WHERE
    p.id = $[id]
    `;
    return db.one(sql, {id});
}

PostService.update = (content, id) => {
    const sql = `
    UPDATE posts
    SET
    content=$[content]
    WHERE
    id=$[id]
    `;
    return db.none(sql, {content, id})
}

PostService.delete = (id) => {
    const sql = `
    DELETE FROM posts p 
    WHERE p.id=$[id]
    `
    return db.none(sql, {id});
}

module.exports = PostService;