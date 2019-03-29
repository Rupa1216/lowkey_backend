const {isValidType} = require('../validators')

const isRequiredsNeeded = body => {
    const requireds = [
        isValidType(body, 'username', 'string'),
        isValidType(body, 'email', 'string'),
        isValidType(body, 'password', 'string'),
        isValidType(body, 'is_private', 'boolean'),
    ];


    if (requireds.some(isValid => isValid === false)) {
        return true;
    }

    return false;
}

module.exports = { isRequiredsNeeded, }