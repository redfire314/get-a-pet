const jwt = require("jsonwebtoken");

/**
 * If is a valid token, returns the content, if not, returns false.
 * @param {String} token
 * @returns
 */
function getTokenData(token) {
    try {
        const privateKey = process.env.TOKEN_PRIVATE_KEY;

        token = token.replace("Bearer ", "");
        return jwt.verify(token, privateKey).data;
    } catch (err) {
        return false;
    }
}

module.exports = getTokenData;
