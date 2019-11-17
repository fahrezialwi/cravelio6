let jwt = require("jsonwebtoken")
let appKey = require('../configs/appKey')

module.exports = {
    verifyToken: (req, res, next) => {
        if (req.method !== "OPTIONS") {
            jwt.verify(req.headers.authorization, appKey, (error, decoded) => {
                if (error) {
                    return res.status(401).json({status: 401, message: "Unauthorized"})
                }
                if (
                    decoded.user_id === parseInt(req.params.id) ||
                    decoded.user_id === parseInt(req.query.user_id) ||
                    decoded.user_id === parseInt(req.body.user_id) ||
                    decoded.email === req.query.email ||
                    decoded.email === req.body.email
                ) {
                    next()
                } else {
                    return res.status(401).json({status: 401, message: "Unauthorized"}) 
                }
            })
        } else {
            next()
        }
    },

    verifyTokenAdmin: (req, res, next) => {
        if (req.method !== "OPTIONS") {
            jwt.verify(req.headers.authorization, appKey, (error, decoded) => {
                if (error) {
                    return res.status(401).json({status: 401, message: "Unauthorized"})
                }

                if (decoded.role === 'admin') {
                    next()
                } else {
                    return res.status(401).json({status: 401, message: "Unauthorized"})
                }
            })
        } else {
            next()
        }
    }
}