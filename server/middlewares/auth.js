const jwt = require("jsonwebtoken");
const messages = require("../helpers/messages");

function auth(req, res, next) {
    let token = req.headers.authorization;

    if (!token) {
        res.status(511).json({ message: messages.protectedRoute });
        return;
    }

    try {
        const privateKey = process.env.TOKEN_PRIVATE_KEY;

        token = token.replace("Bearer ", "");
        jwt.verify(token, privateKey);
        next();
    } catch (err) {
        res.status(403).json({ message: messages.invalidToken });
        return;
    }
}

module.exports = auth;
