const ensureAuth = (req, res, next) => {
    if (!req.session.username) {
        res.status(401).send();
    } else {
        next();
    }
}
  
module.exports = ensureAuth; 