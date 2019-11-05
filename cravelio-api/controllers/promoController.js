const db = require('../database')

module.exports = {
    getPromos: (req, res) => {
        let sql = `SELECT * FROM promos`
        if (req.params.id) {
            sql = `${sql} WHERE user_id = ${req.params.id}`
        }
        if (req.query.promo_code) {
            sql = `${sql} WHERE promo_code = '${req.query.promo_code}'`
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
        let sql = `INSERT INTO promos (promo_id, promo_code, promo_discount) 
        VALUES (0, '${req.body.promo_code}', ${req.body.promo_discount})`

        db.query(sql, (err, result) => {
            if (err) throw err
            res.send({
                status: 201,
                message: 'Create promo success'
            })
        })
    },

    editPromo: (req, res) => {
        let sql = `UPDATE promos SET promo_code = '${req.body.promo_code}', 
        promo_discount = ${req.body.promo_discount} WHERE promo_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            if (err) throw err

            res.send({
                status: 201,
                message: 'Edit promo success',
                results: result
            })
        })
    },

    deletePromo: (req, res) => {
        let sql = `DELETE FROM promos WHERE promo_id = ${req.params.id}`
        db.query(sql, (err, result) => {
            if (err) throw err

            res.send({
                status: 200,
                message: 'Delete promo success',
                results: result
            })
        })
    }
}