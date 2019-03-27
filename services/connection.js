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

ConnectionService.read = (id) => {
    const sql = `
    SELECT 
    c.follower_id, c.following_id, c.status,
    u.username
    FROM connections c
    LEFT JOIN users u
    ON c.follower_id = u.id AND c.following_id = u.id
    WHERE
    c.id = $[id]
    `;
    return db.one(sql, { follower_id, following_id, status });
}

ConnectionService.update = (id, status) => {
    const sql = `
    UPDATE connections
    SET
    $[status] = 'active'
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
    return db.none(sql, { follower_id, following_id, status });
}

module.exports = ConnectionService;