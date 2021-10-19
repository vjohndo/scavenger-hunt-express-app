const express = require('express');
const Users = require('../models/users');
const router = express.Router();
router.use(express.json()); // Code to parse body


router.post('/', (req, res) => {
    // Get user's name from request, look up in the database, check the password etc.
    Users.checkLogin(req.body).then( (dbRes) => {
        if (dbRes) {
            const username = dbRes.username 
            req.session.username = username // Can put other things in the session too
            res.json({ message: 'SUCCESS' })
        } else {
            res.status(406).json({ message: 'login details not on file' })
        }
    }).catch( (err) => {
        res.status(500).json({ message: 'DB NOT WORKING' })
    })
});

// Check login
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