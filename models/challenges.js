const db = require("../database/db");

const Challenges = {
  getAll() {
    const sql = "SELECT * FROM challenges";
    return db.query(sql).then((dbRes) => dbRes.rows);
  },
  getById(reqId) {
    const query = {
      text: `SELECT * FROM challenges WHERE ID = $1`,
      values: [reqId],
    };
    return db.query(query).then((dbRes) => dbRes.rows[0])
  }
};

module.exports = Challenges;