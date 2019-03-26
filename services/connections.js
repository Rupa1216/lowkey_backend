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

ConnectionService.read = (follower_id, following_id, status) => {
    const sql = `
    SELECT 
    c.follower_id, c.following_id, c.status,
    u.username
    FROM connections c
    LEFT JOIN users u
    ON c.follower_id = u.id AND c.following_id = u.id
    WHERE
    c.follower_id = $[follower_id] AND c.following_id = $[following_id]
    `;
    return db.one(sql, { follower_id, following_id, status });
}

ConnectionService.update = (follower_id, following_id, status) => {
    const sql = `
    UPDATE connections
    SET
    $[status] = 'active'
    WHERE
    follower_id = $[follower_id] AND following_id = $[following_id]
    `;
    return db.none(sql, { follower_id, following_id, status })
}



module.exports = ConnectionService;