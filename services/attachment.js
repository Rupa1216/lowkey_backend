const { db } = require('./dbConnect');
const AttachmentService = {};

AttachmentService.create = (post_id, user_id, image_url) => {
    const sql = `
        INSERT INTO attachments (post_id, user_id, image_url) 
        VALUES ($[post_id], $[user_id], $[image_url]) 
        RETURNING id;
        `;
        return db.one(sql, { post_id, user_id, image_url })
    }

AttachmentService.read = (id) => {
    const sql = `
    SELECT 
    a.image_url, a.post_id, a.user_id,
    u.username
    FROM attachments a
    LEFT JOIN users u
    ON a.user_id = u.id
    WHERE
    a.id = $[id]
    `;
    return db.one(sql, {id});
}

AttachmentService.delete = (id) => {
    const sql = `
    DELETE FROM attachments a
    WHERE a.id=$[id]
    `
    return db.none(sql, {id});
}

module.exports = AttachmentService;