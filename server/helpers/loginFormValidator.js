/**
 * Validates input from users form with RegExp.
 * @param {String} email User email.
 * @param {String} password User password.
 * @returns {Boolean}
 */
function loginFormValidator(email, password) {
    if (!email || !password) return false;

    // email@test.com
    const emailRegExp = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    if (!emailRegExp.test(email)) return false;

    // strongP4ss!
    const passRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    if (!passRegExp.test(password)) return false;

    return true;
}

module.exports = loginFormValidator;
