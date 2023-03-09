const jwt = require("jsonwebtoken");

/**
 * Generates token with user id
 * @param {Object} data Object
 * @param {String} expiresIn Format: 1h
 * @returns {String}
 */
function generateToken(data, expiresIn) {
    const privateKey = process.env.TOKEN_PRIVATE_KEY;
    const token = jwt.sign(
        {
            data,
        },
        privateKey,
        { expiresIn: expiresIn }
    );

    return token;
}

module.exports = generateToken;
