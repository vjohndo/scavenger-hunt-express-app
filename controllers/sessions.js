const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    // TODO: Get user's name from request, look up in the database, check the password etc.
    // Need to create a model here.
    const username = "Fred" // Don't actually want to hardcode this name
    req.session.username = username // Can put other things in the session too
    res.json({ message: 'logged in successfully' })
});
//axios.post("/api/sessions").then((res) => console.log(res.data));

router.get("/", (req, res) => {
        // Put this in one of the /api/challenges routes.
    if (!req.session.username) {
        // 403 means "forbidden"
        res.status(403).json({ message: "Not logged in" });
    } else {
        res.json({ username: req.session.username });
    }
});
//axios.get("/api/sessions").then((res) => console.log(res.data));


router.delete("/", (req, res) => {
    req.session.destroy();
    res.json({ message: "You have logged out successfully" });
});
//axios.delete("/api/sessions").then((res) => console.log(res.data));

module.exports = router;