const { db } = require('./dbConnect');
const LikeService = {};

LikeService.create = (user_id, post_id) => {
    const sql = `
        INSERT INTO likes (user_id, post_id) 
        VALUES ($[user_id], $[post_id]) 
        RETURNING id;
        `;
        return db.one(sql, { user_id, post_id })
    }

LikeService.delete = (id) => {
    const sql = `
    DELETE FROM likes l
    WHERE l.id=$[id]
    `
    return db.none(sql, { id });
}

module.exports = LikeService;