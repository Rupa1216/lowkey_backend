const { db } = require('./dbConnect');
const UserService = {};

UserService.create = (fbase_uid, username, email) => {
const sql = `
    INSERT INTO users (fbase_uid, username, email) 
    VALUES ($[fbase_uid], $[username], $[email]) 
    RETURNING id;
    `;
    return db.one(sql, { fbase_uid, username, email })
}

UserService.readId = (fbase_uid) => {
    const sql = `
    SELECT 
    u.username, u.email, u.is_private, u.created_at
    FROM users u
    WHERE
    u.fbase_uid = $[fbase_uid]
    `;
    return db.one(sql, {fbase_uid});
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

UserService.update = (fbase_uid, username, bio='', display_name='', email, avatar_url='') => {
    const sql = `
    UPDATE users
    SET
    username=$[username], bio=$[bio], display_name=$[display_name], email=$[email], avatar_url=$[avatar_url]
    WHERE
    fbase_uid=$[fbase_uid]
    `;
    return db.none(sql, {fbase_uid, username, bio, display_name, email, avatar_url})
}

UserService.delete = (fbase_uid) => {
    const sql = `
    DELETE FROM users u 
    WHERE u.fbase_uid=$[fbase_uid]
    `
    return db.none(sql, {fbase_uid});
}

UserService.allPublicUsers = () => { 
    const sql = `
    SELECT
    *
    FROM users u
    WHERE
    u.is_private = false
    `
    return db.any(sql);
}

module.exports = UserService;