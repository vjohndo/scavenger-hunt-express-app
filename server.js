const express = require("express");

const Challenges = require('./models/challenges')

const app = express();
const port = 3000;

// app.get("/api/challenges", (req, res) => {
//     Challenges.getAll().then(challenges => {
//       res.json(challenges);
//     });
// });

// ALTERNATE ASYNC SYNTAX
app.get("/api/challenges", async(req,res) => {
  const challenges = await Challenges.getAll();
  res.json(challenges);
});

app.use(express.static("client"));

// start the web server
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});