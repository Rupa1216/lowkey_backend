const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/lowkey');

module.exports = {
    db,
}

