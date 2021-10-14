const express = require("express")

const router = express.Router();

router.use((err, req, res, next) => {
    res.status(500)
    res.json({ "message": err.message })
});

module.exports = router;