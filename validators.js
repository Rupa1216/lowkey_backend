const isValidType = (obj, propertyName, propertyType) => {
    return typeof obj[propertyName] === propertyType
}

// typeof req[username] === string

module.exports = {
    isValidType,
}