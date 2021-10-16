const db = require("../database/db");

const Challenges = {
  getAll() {
    const sql = "SELECT * FROM challenges";
    return db.query(sql).then((dbRes) => dbRes.rows);
  },
  getById(reqId) {
    const sql = {
      text: `SELECT * FROM challenges WHERE ID = $1`,
      values: [reqId],
    };
    return db.query(sql).then((dbRes) => dbRes.rows[0])
  },
  insertByJSON(reqObject) {
    const {name, challenge, address} = reqObject
    const sql = {
      text: "INSERT INTO challenges(name, challenge, address) VALUES ($1, $2, $3)",
      values: [name, challenge, address]
    }
    return db.query(sql).then((dbRes) => dbRes)
  }
};

module.exports = Challenges;