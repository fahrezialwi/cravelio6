const db = require('../database')
const moment = require('moment')

module.exports = {
    getTrips: (req, res) => {
        let sql = `select *, (select count(*) from schedules as s
        where  start_date > '${moment(new Date()).add(6, 'hours').format('YYYY-MM-DD HH:mm:ss.SSS')}' 
        and s.trip_id = t.trip_id) as schedule from trips as t
        join pictures as p on t.trip_id = p.trip_id where p.is_main = 1`

        if (req.params.path) {
            sql += ` and t.path = '${req.params.path}'`
        }
        if (req.query.trip_id) {
            sql += ` and t.trip_id = '${req.query.trip_id}'`
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

    createTrip: (req, res) => {
        let sql = `insert into trips (trip_id, created_at, updated_at)
        values (0, '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}',
        '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}')`

        db.query(sql, (err, result) => {
            if (err) throw err
            res.send({
                status: 200,
                message: 'Trip created',
                results: result
            })
        })
    },

    editTrip: (req, res) => {
        let sql = `update trips set path = '${req.body.path}', trip_name = ${db.escape(req.body.trip_name)},
        meeting_point = ${db.escape(req.body.meeting_point)}, price = ${req.body.price}, duration = '${req.body.duration}',
        category = ${db.escape(req.body.category)}, region = ${db.escape(req.body.region)}, quota = ${req.body.quota},
        description = ${db.escape(req.body.description)}, itinerary = ${db.escape(req.body.itinerary)}, price_includes = ${db.escape(req.body.price_includes)},
        price_excludes = ${db.escape(req.body.price_excludes)}, faq = ${db.escape(req.body.faq)},
        updated_at = '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}' where trip_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            if (err) throw err
            res.send({
                status: 200,
                message: 'Trip updated',
                results: result
            })
        })
    },

    deleteTrip: (req, res) => {
        let sql = `delete from trips where trip_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            if (err) throw err
            res.send({
                status: 201,
                message: 'Trip deleted',
                results: result
            })
        })
    }
}