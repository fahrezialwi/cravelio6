const db = require('../database')
const moment = require('moment')

module.exports = {
    getFavorites: (req, res) => {
        let sql = `select f.favorite_id, f.user_id, f.is_deleted, f.trip_id,
        t.path, t.trip_name, t.price, t.duration, t.category, p.picture_link,
        (select count(*) from schedules as s 
        where start_date > '${moment(new Date()).add(6, 'hours').format('YYYY-MM-DD HH:mm:ss.SSS')}' 
        and s.trip_id = t.trip_id) as schedule from favorites as f
        join trips as t on f.trip_id = t.trip_id
        join pictures as p on f.trip_id = p.trip_id
        where f.is_deleted = 0 and p.is_main = 1`

        if (req.params.id) {
            sql = `${sql} and f.favorite_id = ${req.params.id}`
        }
        if (req.query.path) {
            sql = `${sql} and t.path = '${req.query.path}'`
        }
        if (req.query.user_id) {
            sql = `${sql} and f.user_id = ${req.query.user_id}`
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
        let sql = `select * from favorites as f
        join trips as t on f.trip_id = t.trip_id`

        if (req.params || req.query) {
            sql = `${sql} where`
            
            if (req.params.id) {
                sql = `${sql} f.favorite_id = ${req.params.id} and`
            }
            if (req.query.path) {
                sql = `${sql} t.path = '${req.query.path}' and`
            }
            if (req.query.year) {
                sql = `${sql} year(f.created_at) = ${req.query.year} and`
            }
            if (req.query.user_id) {
                sql = `${sql} f.user_id = ${req.query.user_id} and`
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
        let sql = `insert into favorites values (0, ${req.body.trip_id}, ${req.body.user_id}, 0,
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
        let sql = `update favorites set is_deleted = 1,
        updated_at = '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}'
        where favorite_id = ${req.params.id}` 

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