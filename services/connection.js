const { db } = require('./dbConnect');
const ConnectionService = {};

ConnectionService.create = (follower_id, following_id, status) => {
    const sql = `
        INSERT INTO connections (follower_id, following_id, status) 
        VALUES ($[follower_id], $[following_id], $[status]) 
        RETURNING id;
        `;
        return db.one(sql, { follower_id, following_id, status })
    }

ConnectionService.read = (id) => { // make followers and following into 2 separate tables?
    const sql = `
    SELECT 
    c.follower_id, c.following_id, c.status,
    u.username
    FROM connections c
    LEFT JOIN users u
    ON c.follower_id = u.id 
    WHERE
    c.id = $[id]
    `; // remove LEFT JOIN? 
    return db.one(sql, { id });
}

ConnectionService.readAll = (id) => { 
    const sql = `
    SELECT 
    u.username, u.avatar_url, u.bio
    FROM connections c
    LEFT JOIN users u
    ON c.follower_id = u.id 
    WHERE
    c.following_id = $[id] AND c.status='active'
    `;
    return db.any(sql, { id });
}

ConnectionService.update = (id, status) => {
    const sql = `
    UPDATE connections
    SET
    status = 'active'
    WHERE
    id = $[id]
    `;
    return db.none(sql, { id, status })
}

ConnectionService.delete = (id) => {
    const sql = `
    DELETE FROM connections c
    WHERE c.id=$[id]
    `
    return db.none(sql, { id });
}

module.exports = ConnectionService;