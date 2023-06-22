const jwt = require('jsonwebtoken')

const createJWT = function(id) {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

module.exports = {
    createJWT
}