const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];  // Bearer Token

    if (!token) {
        return res.sendStatus(401);                         //Upon login, token is generated and given to UI. Have to use that token throughout the lesson.
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
