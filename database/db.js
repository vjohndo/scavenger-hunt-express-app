const pg = require("pg");

// All the information required to access the local database
// This is a constructor so need to call new
const db = new pg.Pool({
    database: "scavenger_hunt",
});

// Defines the export, what is the export
module.exports = db;