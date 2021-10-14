const express = require("express");

const Rules = require("../models/rules");

const router = express.Router();

router.get("/", (req, res) => {

    let rulesObject = Rules.getAll()

    res.json(rulesObject)
})

module.exports = router;