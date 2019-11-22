const db = require('../database')
const moment = require('moment')

module.exports = {
    getTokens: (req, res) => {
        let sql = `SELECT * FROM tokens`

        if (req.params.id) {
            sql = `${sql} WHERE token_id = ${req.params.id}`
        }

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                if (result.length > 0) {
                    res.send({
                        status: 200,
                        results: result
                    })
                } else {
                    res.send({
                        status: 404,
                        message: 'Token not found',
                        results: result
                    })
                }
            } catch(err) {
                console.log(err)
            }
        })
    },

    createToken: (req, res) => {
        let sql = `INSERT INTO tokens (token_id, email, token, created_at) 
        VALUES (0, '${req.body.email}', '${req.body.token}', 
        '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}')`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send({
                    status: 201,
                    message: 'Create token success'
                })
            } catch(err) {
                console.log(err)
            }
        })
    }
}