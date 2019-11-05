const db = require('../database')

module.exports = {
    getPromos: (req, res) => {
        let sql = `select * from promos`
        if (req.params.id) {
            sql = `${sql} where user_id = ${req.params.id}`
        }
        if (req.query.promo_code) {
            sql = `${sql} where promo_code = '${req.query.promo_code}'`
        }
        db.query(sql, (err, result) => {
            if (err) throw err
            if (result.length > 0) {
                res.send({
                    status: 200,
                    results: result
                })
            } else {
                res.send({
                    status: 404,
                    message: 'Promo not found',
                    results: result
                })
            }
        })
    },

    createPromo: (req, res) => {
        db.query(`insert into promos (promo_code, promo_discount) values ('${req.body.promo_code}', ${req.body.promo_discount})`, (err, result) => {
            if (err) throw err
            res.send({
                status: 201,
                message: 'Promo created'
            })
        })
    }
}