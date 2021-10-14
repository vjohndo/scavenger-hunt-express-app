const express = require("express");

const middlewareRouter = require('./middleware/middelware');
const loggerRouter = require('./middleware/logger');
const errorRouter = require('./middleware/error');
const rulesRouter = require('./controllers/rules');
const challengesRouter = require('./controllers/challenges');

const app = express();
const port = 3000;

app.use("/", loggerRouter)

app.use(express.static("client"));

app.use("/", middlewareRouter)

// Any of these routes will get thrown into the challengesRouter
app.use("/api/challenges", challengesRouter);

app.use("/api/rules", rulesRouter);

app.use("/", errorRouter)

// start the web server
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});