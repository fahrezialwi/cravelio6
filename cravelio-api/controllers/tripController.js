const db = require('../database')
const moment = require('moment')

module.exports = {
    getTrips: (req, res) => {
        let sql = `select * from trips as t join pictures as p on t.trip_id = p.trip_id where p.is_main = 1`
        if(req.params.path){
            sql += ` and t.path = '${req.params.path}'`
        }
        if(req.query.trip_id){
            sql += ` and t.trip_id = '${req.query.trip_id}'`
        }
        db.query(sql, (err, result) => {
            if (err) throw err
            if (result.length > 0){
                let data = result.map(val => {
                    return {
                        trip_id: val.trip_id,
                        path: val.path,
                        trip_name: val.trip_name,
                        picture_id: val.picture_id,
                        picture_link: val.picture_link,
                        meeting_point: val.meeting_point,
                        price: val.price,
                        duration: val.duration,
                        category: val.category,
                        region: val.region,
                        quota: val.quota,
                        description: val.description,
                        itinerary: val.itinerary,
                        price_includes: val.price_includes,
                        price_excludes: val.price_excludes,
                        faq: val.faq
                    }
                })
                res.send({
                    status: 200,
                    results: data
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
    
    // createTrip: (req, res) => {
    //     let sql = `insert into trips (trip_id, path, trip_name, meeting_point, price, duration, category,
    //     region, quota, description, itinerary, price_includes, price_excludes, faq, created_at, updated_at)
    //     values (0, '${req.body.path}', ${db.escape(req.body.trip_name)}, ${db.escape(req.body.meeting_point)}, ${req.body.price}, 
    //     '${req.body.duration}', ${db.escape(req.body.category)}, ${db.escape(req.body.region)}, ${req.body.quota}, '${req.body.description}',
    //     ${db.escape(req.body.itinerary)}, ${db.escape(req.body.price_includes)}, ${db.escape(req.body.price_excludes)}, ${db.escape(req.body.faq)},
    //     '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}')`

    //     db.query(sql, (err, result) => {
    //         if (err) throw err
    //         res.send({
    //             status: 200,
    //             message: 'Trip created',
    //             results: result
    //         })
    //     })
    // },

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
        price_excludes = ${db.escape(req.body.price_excludes)}, faq = ${db.escape(req.body.faq)}, updated_at = '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}'
        where trip_id = ${req.params.id}`

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