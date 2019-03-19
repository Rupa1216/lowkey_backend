const {isValidType} = require('../validators')

test("It returns a boolean", () => {
    expect(typeof isValidType({}, "username", "string")).toBe("boolean")
})

test("It returns true if object property is not available", () => {
    expect(isValidType({}, "username", "undefined")).toBe(true)
})

test("It returns false if object property is not available but we expect it to exist", () => {
    expect(isValidType({}, "username", "string")).toBe(false)
})

test("It returns true if object property matches property type", () => {
    expect(isValidType({'username': 'foo'}, 'username', "string")).toBe(true)
})