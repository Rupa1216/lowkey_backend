const { db } = require('./dbConnect');
const PostService = {};

PostService.create = (fbase_id, text_content='') => {
    const sql = `
        INSERT INTO posts (fbase_id, text_content) 
        VALUES ($[fbase_id], $[text_content]) 
        RETURNING id;
        `;
        return db.one(sql, { fbase_id, text_content })
    }
    // replace user_id with fbase_uid ???

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

PostService.readAll = (username) => {
    const sql = `
    SELECT 
    p.created_at, p.content
    FROM posts p
    LEFT JOIN users u
    ON p.user_id = u.id
    WHERE
    u.username = $[username]
    `;
    return db.any(sql, {username});
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