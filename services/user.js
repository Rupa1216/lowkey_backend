const { db } = require('./dbConnect');
const UserService = {};

UserService.create = (username, email) => {
const sql = `
    INSERT INTO users (username, email) 
    VALUES ($[username], $[email]) 
    RETURNING id;
    `;
    return db.one(sql, { username, email })
}

UserService.read = (id) => {
    const sql = `
    SELECT 
    u.username, u.email, u.is_private, u.created_at
    FROM users u
    WHERE
    u.id = $[id]
    `;
    return db.one(sql, {id});
}

UserService.update = (id, username, email) => {
    const sql = `
    UPDATE users
    SET
    username=$[username], email=$[email]
    WHERE
    id=$[id]
    `;
    return db.none(sql, {id, username, email})
}

UserService.delete = (id) => {
    const sql = `
    DELETE FROM users u 
    WHERE u.id=$[id]
    `
    return db.none(sql, {id});
}

UserService.allPublicUsers = (is_private) => { // what parameter should I pass here?
    const sql = `
    SELECT
    *
    FROM users u
    WHERE
    u.$[is_private] = false
    `;
}

module.exports = UserService;