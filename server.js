const express = require("express");
const pg = require('pg');

const app = express();
const port = 3000;

// All the information required to access the local database
// This is a constructor so need to call new
const db = new pg.Pool({
  database: "scavenger_hunt"
})

app.get("/api/challenges", (req, res) => {
  // Database access works via promise so need to do 
  db.query("select * from challenges").then((dbResult) => {
    // Within the query, pull out the "rows" and set the key as challenges
    res.json( {challenges: dbResult.rows} )
  })
})

app.use(express.static("client"));

// start the web server
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});