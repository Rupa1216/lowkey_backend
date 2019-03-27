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

UserService.read = (username) => {
    const sql = `
    SELECT 
    u.username, u.email, u.is_private, u.created_at
    FROM users u
    WHERE
    u.username = $[username]
    `;
    return db.one(sql, {username});
}

UserService.update = (username, email) => {
    const sql = `
    UPDATE users
    SET
    username=$[username], email=$[email]
    WHERE
    username=$[username]
    `;
    return db.none(sql, {username, email})
}

UserService.delete = (username) => {
    const sql = `
    DELETE FROM users u 
    WHERE u.username=$[username]
    `
    return db.none(sql, {username});
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