const db = require('../database')
const moment = require('moment')

module.exports = {
    getFavorites: (req, res) => {
        let sql = `SELECT f.favorite_id, f.user_id, f.is_deleted, f.trip_id,
        t.path, t.trip_name, t.price, t.duration, t.category, p.picture_link,
        (SELECT COUNT(*) FROM schedules AS s 
        WHERE start_date > '${moment(new Date()).add(6, 'hours').format('YYYY-MM-DD HH:mm:ss.SSS')}' 
        AND s.trip_id = t.trip_id) AS schedule FROM favorites AS f
        JOIN trips AS t ON f.trip_id = t.trip_id
        JOIN pictures AS p ON f.trip_id = p.trip_id
        WHERE f.is_deleted = 0 AND p.is_main = 1`

        if (req.params.id) {
            sql = `${sql} AND f.favorite_id = ${req.params.id}`
        }
        if (req.query.path) {
            sql = `${sql} AND t.path = '${req.query.path}'`
        }
        if (req.query.user_id) {
            sql = `${sql} AND f.user_id = ${req.query.user_id}`
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
                    message: 'Data not found',
                    results: result
                })
            }
        })
    },
    
    getAllFavorites: (req, res) => {
        let sql = `SELECT * FROM favorites AS f
        JOIN trips AS t ON f.trip_id = t.trip_id`

        if (req.params || req.query) {
            sql = `${sql} WHERE`
            
            if (req.params.id) {
                sql = `${sql} f.favorite_id = ${req.params.id} AND`
            }
            if (req.query.path) {
                sql = `${sql} t.path = '${req.query.path}' AND`
            }
            if (req.query.year) {
                sql = `${sql} year(f.created_at) = ${req.query.year} AND`
            }
            if (req.query.user_id) {
                sql = `${sql} f.user_id = ${req.query.user_id} AND`
            }    
            
            sql = sql.slice(0, -4)
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
                    message: 'Data not found',
                    results: result
                })
            }
        })
    },

    createFavorite: (req, res) => {
        let sql = `INSERT INTO favorites VALUES (0, ${req.body.trip_id}, ${req.body.user_id}, 0,
        '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}',
        '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}')`

        db.query(sql, (err, result) => {
            if (err) throw err
            if (result.length > 0) {          
                res.send({
                    status: 200,
                    message: 'Create favorite success',
                    results: result
                })
            } else {
                res.send({
                    status: 401,
                    message: 'Create favorite error',
                    results: result
                })
            }
        }) 
    },

    deleteFavorite: (req, res) => {
        let sql = `UPDATE favorites SET is_deleted = 1,
        updated_at = '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}'
        WHERE favorite_id = ${req.params.id}` 

        db.query(sql, (err, result) => {
            if (err) throw err
            if (result.length > 0) {          
                res.send({
                    status: 200,
                    message: 'Delete favorite success',
                    results: result
                })
            } else {
                res.send({
                    status: 401,
                    message: 'Delete favorite error',
                    results: result
                })
            }
        })
    }
}