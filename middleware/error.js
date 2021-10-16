const errorHandler = (err, req, res, next) => {
    let message = err.message || 'something went wrong'
    res.status(500).json({ "message": message })
};

module.exports = errorHandler