const jwt = require('jsonwebtoken')

const createRefreshJWT = function(id){
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.RJWT_LIFETIME
    })
}

module.exports = {
    createRefreshJWT
}