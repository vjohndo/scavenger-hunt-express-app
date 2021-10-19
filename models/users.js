const db = require("../database/db");

const Users = {
    checkLogin(reqObject) {
        const {username, password} = reqObject;
        const sql = {
            text: "SELECT * FROM users WHERE username = $1 AND password = $2",
            values: [username, password]
        };
        return db.query(sql).then((dbRes) => dbRes.rows[0])
    }
}

module.exports = Users;