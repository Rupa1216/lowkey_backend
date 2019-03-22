const { db } = require('./dbConnect');
const UserService = {};

UserService.create = (username, email, password, token = null, acct_type) => {
const sql = `
    INSERT INTO users (username, email, password, token, type) 
    VALUES ($[username], $[email], $[password], $[token], $[type]) 
    RETURNING id;
    `;
    return db.one(sql, { username, email, password, token, acct_type })
}

UserService.create("Rupa", "me@me", "123", "xxyyzz", "private")

UserService.update = (username, email, password, token, acct_type) => {
    const sql = `
    UPDATE users
    SET
    username=$[username], email=$[email], password=$[password], token=$[token], acct_type=$[acct_type]
    WHERE
    name=$[name]
    `;
    return db.one(sql, {username, email, password, token, acct_type})
}

module.exports = UserService;