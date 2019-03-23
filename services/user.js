const { db } = require('./dbConnect');
const UserService = {};

UserService.create = (username, email, token = null, acct_type) => {
const sql = `
    INSERT INTO users (username, email, token, acct_type) 
    VALUES ($[username], $[email], $[token], $[acct_type]) 
    RETURNING id;
    `;
    return db.one(sql, { username, email, token, acct_type })
}

UserService.read = (username) => {
    const sql = `
    SELECT 
    u.username, u.email, u.acct_type, u.created_at
    FROM users u
    WHERE
    u.username = $[username]
    `;
    return db.one(sql, {username});
}

UserService.update = (username, email, token, acct_type) => {
    const sql = `
    UPDATE users
    SET
    username=$[username], email=$[email], token=$[token], acct_type=$[acct_type]
    WHERE
    id=$[id]
    `; // should it be id or username in above line?
    return db.one(sql, {username, email, token, acct_type})
}

UserService.delete = (username) => {
    const sql = `
    DELETE FROM users u 
    WHERE u.username=$[username]
    `
    return db.none(sql, {username});
}

UserService.allPublicUsers = (acct_type) => { // what parameter should I pass here?
    const sql = `
    SELECT
    u.username, u.created_at
    FROM users u
    WHERE
    u.$[acct_type] = 'public'
    `;
}

module.exports = UserService;