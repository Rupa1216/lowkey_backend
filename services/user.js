const db = require('./dbConnect');
const UserService = {};

UserService.create = (username, email, password, token=null, type) => {
    const sql = `
    INSERT INTO users (username, email, password, token, type) VALUES ($[username], $[email], $[password], $[token], $[type]) 
    RETURNING id;
    `;
    return db.one(sql, { username, email, password, token, type })
}

module.exports = UserService;