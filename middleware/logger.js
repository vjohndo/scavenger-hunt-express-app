const logger = (req, res, next) => {
    // I want to log things
    console.log(new Date().toLocaleString().replace(',',''),Intl.DateTimeFormat().resolvedOptions().timeZone, req.method ,req.path);

    // Runs the appropriate "next line"
    next();
};

module.exports = logger;