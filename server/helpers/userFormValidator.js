/**
 * Validates input from users form with RegExp.
 * @param {String} name User name
 * @param {String} email User email
 * @param {String} phone User phone
 * @param {Number} zip User zip code
 * @param {String} password User password
 * @param {String} password2 User confirm password
 * @returns {Boolean}
 */
function userFormValidator(name, email, phone, zip, password, password2) {
    if (!name || !email || !phone || !zip || !password || !password2) return false;

    if (password !== password2) return false;

    // Validates individual input with RegExp
    // John Doe
    const nameRegExp = /[\w'][^0-9"!@#$%¨&*()\-_=+[{\]},<.>;:\\/?]{2,32}/;
    if (!nameRegExp.test(name)) return false;

    // email@test.com
    const emailRegExp = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    if (!emailRegExp.test(email)) return false;

    // 012 99999-8888 || 012999998888
    const phoneRegExp = /[0-9]{3}.?[0-9]{5}-?[0-9]{4}/;
    if (!phoneRegExp.test(phone)) return false;

    // 12345678
    const zipRegExp = /[0-9]{8}/;
    if (!zipRegExp.test(zip)) return false;

    // strongP4ss!
    const passRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    if (!passRegExp.test(password) || !passRegExp.test(password2)) return false;

    return true;
}

module.exports = userFormValidator;
