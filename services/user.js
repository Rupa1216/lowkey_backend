const { db } = require('./dbConnect');
const UserService = {};

UserService.create = (username, email, token = null, acct_type) => {
const sql = `
    INSERT INTO users (username, email, token, type) 
    VALUES ($[username], $[email], $[token], $[type]) 
    RETURNING id;
    `;
    return db.one(sql, { username, email, token, acct_type })
}

UserService.create("TK", "TK@gmail", "123lol", "nekot", "private")

UserService.update = (username, email, token, acct_type) => {
    const sql = `
    UPDATE users
    SET
    username=$[username], email=$[email], token=$[token], acct_type=$[acct_type]
    WHERE
    id=$[id]
    `;
    return db.one(sql, {username, email, token, acct_type})
}

module.exports = UserService;