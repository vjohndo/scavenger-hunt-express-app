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
    },
    challengeExists(reqObject) {
        const {challenge} = reqObject
        const sql = {
            text: "SELECT * FROM challenges WHERE challenge = $1",
            values: [challenge]
        }
        return db.query(sql).then((dbRes) => Boolean(dbRes[0]))
    },
    addressExists(reqObject) {
        const {address} = reqObject
        const sql = {
            text: "SELECT * FROM challenges WHERE address = $1",
            values: [address]
        }
        return db.query(sql).then((dbRes) => Boolean(dbRes[0]))
    }
};

module.exports = Challenges;