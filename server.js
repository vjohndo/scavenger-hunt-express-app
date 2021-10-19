const express = require("express");

// Packages for sessions
const dotenv = require("dotenv");
dotenv.config(); // allows easy reading of the .env
const db = require("./database/db"); // The postgres connection we already have
const expressSession = require("express-session"); // Express library to handle sessions
const pgSession = require("connect-pg-simple")(expressSession); // Creates a session instance for this express session 
const sessionController = require("./controllers/sessions"); // Our controller to handle log ins and outs for sessions

// Middleware
const middleware = require('./middleware/middleware');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');

// Routers
const rulesRouter = require('./controllers/rules');
const challengesRouter = require('./controllers/challenges');

// Express server config
const app = express();
const port = 3000;

// __ROUTES AND MIDDLEWARE__ //

// Logger middleware
app.use(middleware);
app.use(logger);

// Session middleware & router
app.use(
    expressSession({
        store: new pgSession({ // "storing the session in DB rather than memory"
            pool: db, // Connects to our postgres db
            createTableIfMissing: true, // Creates a session table in your database (go look at it!)
        }),
        secret: process.env.EXPRESS_SESSION_SECRET_KEY, // Access the secret key from .env
    })
);
app.use("/api/sessions", sessionController);

// Checks for any files in the static client
app.use(express.static("client"));

// Any of these URLS will get thrown into the challengesRouter
app.use("/api/challenges", challengesRouter);

// Any of these routes will get thrown into the rulesRouter
app.use("/api/rules", rulesRouter);

// A test URL that throws and error
app.get("/throwerror", (req, res) => {
    boom();
    res.send('HAHAHA')
});

// Error handling middleware
app.use(errorHandler);

// Start the web server
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});