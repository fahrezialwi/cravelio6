import appKey from '../configs/appKey'
let jwt = require("jsonwebtoken")

let createToken = (email) => {
    return jwt.sign({email}, appKey, {expiresIn: "24h"})
}

export default createToken