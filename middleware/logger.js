const express = require("express")

const router = express.Router();


// Middleware if you put it before app.use(express)
// No matter which route you hit, this code will run (depeneding on where you have it in the code)
// Useful for securing the login 
router.use((req, res, next) => {
    // I want to log things
    console.log(new Date().toLocaleString().replace(',',''),Intl.DateTimeFormat().resolvedOptions().timeZone, req.method ,req.path);

    // Runs the appropriate "next line"
    next();
});

module.exports = router;