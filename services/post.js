const { db } = require('./dbConnect');
const PostService = {};

PostService.create = (user_id, content) => {
    const sql = `
        INSERT INTO posts (user_id, content) 
        VALUES ($[user_id], $[content]) 
        RETURNING id;
        `;
        return db.one(sql, { user_id, content })
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

PostService.update = (id, content) => {
    const sql = `
    UPDATE posts
    SET
    content=$[content]
    WHERE
    id=$[id]
    `;
    return db.none(sql, {id, content})
}

PostService.delete = (id) => {
    const sql = `
    DELETE FROM posts p 
    WHERE p.id=$[id]
    `
    return db.none(sql, {id});
}

module.exports = PostService;