let jwt = require("jsonwebtoken")
let appKey = require('../configs/appKey')

let verifyToken = (req, res, next) => {
    if (req.method !== "OPTIONS") {
        jwt.verify(req.headers.Authorization, appKey, (error, decoded) => {
            if (error) {
                return res.status(401).json({status: 401, message: "Unauthorized"})
            }
            req.user = decoded
            next()
        })
    } else {
        next()
    }
}

module.exports = verifyToken