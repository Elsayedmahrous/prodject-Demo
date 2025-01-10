const { validationResult } = require('express-validator');
// 2- middleware ==> catch errors from rules if exist
const validationMiddleware = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    next();
};

module.exports = validationMiddleware;