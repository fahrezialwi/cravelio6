const db = require('../database')
const moment = require('moment')

module.exports = {
    getTrips: (req, res) => {
        let sql = `SELECT *, (SELECT COUNT(*) FROM schedules AS s
        WHERE s.start_date > '${moment(new Date()).add(6, 'hours').format('YYYY-MM-DD HH:mm:ss.SSS')}' 
        AND s.trip_id = t.trip_id AND s.quota_left > 0) AS has_schedule FROM trips AS t
        JOIN pictures AS p ON t.trip_id = p.trip_id WHERE p.is_main = 1`

        if (req.params.path) {
            sql += ` AND t.path = '${req.params.path}'`
        }
        if (req.query.trip_id) {
            sql += ` AND t.trip_id = '${req.query.trip_id}'`
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
                        message: 'Data not found',
                        results: result
                    })
                }
            } catch(err) {
                console.log(err)
            }
        })
    },

    getDomesticTrips: (req, res) => {
        let sql = `SELECT *, (SELECT COUNT(*) FROM schedules AS s
        WHERE s.start_date > '${moment(new Date()).add(6, 'hours').format('YYYY-MM-DD HH:mm:ss.SSS')}' 
        AND s.trip_id = t.trip_id AND s.quota_left > 0) AS has_schedule FROM trips AS t
        JOIN pictures AS p ON t.trip_id = p.trip_id WHERE p.is_main = 1 AND t.region = 'Indonesia'`

        if (req.params.path) {
            sql += ` AND t.path = '${req.params.path}'`
        }
        if (req.query.trip_id) {
            sql += ` AND t.trip_id = '${req.query.trip_id}'`
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
                        message: 'Data not found',
                        results: result
                    })
                }
            } catch(err) {
                console.log(err)
            }
        })
    },

    getInternationalTrips: (req, res) => {
        let sql = `SELECT *, (SELECT COUNT(*) FROM schedules AS s
        WHERE s.start_date > '${moment(new Date()).add(6, 'hours').format('YYYY-MM-DD HH:mm:ss.SSS')}' 
        AND s.trip_id = t.trip_id AND s.quota_left > 0) AS has_schedule FROM trips AS t
        JOIN pictures AS p ON t.trip_id = p.trip_id WHERE p.is_main = 1 AND NOT t.region = 'Indonesia'`

        if (req.params.path) {
            sql += ` AND t.path = '${req.params.path}'`
        }
        if (req.query.trip_id) {
            sql += ` AND t.trip_id = '${req.query.trip_id}'`
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
                        message: 'Data not found',
                        results: result
                    })
                }
            } catch(err) {
                console.log(err)
            }
        })
    },

    createTrip: (req, res) => {
        let sql = `INSERT INTO trips (trip_id, created_at, updated_at)
        VALUES (0, '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}',
        '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}')`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send({
                    status: 201,
                    message: 'Create trip success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    },

    editTrip: (req, res) => {
        let sql = `UPDATE trips SET path = '${req.body.path}', trip_name = ${db.escape(req.body.trip_name)},
        meeting_point = ${db.escape(req.body.meeting_point)}, price = ${req.body.price}, duration = '${req.body.duration}',
        category = ${db.escape(req.body.category)}, region = ${db.escape(req.body.region)}, quota = ${req.body.quota},
        description = ${db.escape(req.body.description)}, itinerary = ${db.escape(req.body.itinerary)}, price_includes = ${db.escape(req.body.price_includes)},
        price_excludes = ${db.escape(req.body.price_excludes)}, terms_conditions = ${db.escape(req.body.terms_conditions)},
        updated_at = '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}' WHERE trip_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send({
                    status: 200,
                    message: 'Edit trip success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    },

    deleteTrip: (req, res) => {
        let sql = `DELETE FROM trips WHERE trip_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send({
                    status: 200,
                    message: 'Delete trip success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    }
}