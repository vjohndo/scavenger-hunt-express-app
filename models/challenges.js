const db = require("../database/db");

const Challenges = {
  getAll() {
    const sql = "SELECT * FROM challenges";
    return db.query(sql).then((dbRes) => dbRes.rows);
  },
};

module.exports = Challenges;