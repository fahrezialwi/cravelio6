const db = require('../database')
const moment = require('moment')

module.exports = {
    getTrips: (req, res) => {
        let sql = `select t.trip_id, t.path, t.trip_name, p.picture_id, p.picture_link, t.meeting_point,
        t.price, t.duration, t.category, t.region, t.quota, s.schedule_id, s.start_date, s.end_date,
        t.description, t.itinerary, t.price_includes, t.price_excludes, t.faq
        from trips as t join pictures as p on t.trip_id = p.trip_id 
        left join schedules as s on t.trip_id = s.trip_id where p.is_main = 1`

        if(req.params.path){
            sql += ` and t.path = '${req.params.path}'`
        }
        if(req.query.trip_id){
            sql += ` and t.trip_id = '${req.query.trip_id}'`
        }
        db.query(sql, (err, result) => {
            if (err) throw err

            let data = []
            let iterator = 0

            for (let i = 0; i < result.length; i++) {
                if (i == 0){
                    data.push({
                        trip_id: result[0].trip_id,
                        path: result[0].path,
                        trip_name: result[0].trip_name,
                        picture_id: result[0].picture_id,
                        picture_link: result[0].picture_link,
                        meeting_point: result[0].meeting_point,
                        price: result[0].price,
                        duration: result[0].duration,
                        category: result[0].category,
                        region: result[0].region,
                        quota: result[0].quota,
                        schedules: [{
                            schedule_id: result[i].schedule_id,
                            start_date: result[i].start_date,
                            end_date: result[i].end_date
                        }],
                        description: result[0].description,
                        itinerary: result[0].itinerary,
                        price_includes: result[0].price_includes,
                        price_excludes: result[0].price_excludes,
                        faq: result[0].faq
                    })
                    iterator++
                    continue
                }

                if (result[i].trip_id == result[i-1].trip_id){
                    data[iterator - 1].schedules.push({
                        schedule_id: result[i].schedule_id,
                        start_date: result[i].start_date,
                        end_date: result[i].end_date
                    })
                } else {
                    data.push({
                        trip_id: result[i].trip_id,
                        path: result[i].path,
                        trip_name: result[i].trip_name,
                        picture_id: result[i].picture_id,
                        picture_link: result[i].picture_link,
                        meeting_point: result[i].meeting_point,
                        price: result[i].price,
                        duration: result[i].duration,
                        category: result[i].category,
                        region: result[i].region,
                        quota: result[i].quota,
                        schedules: [{
                            schedule_id: result[i].schedule_id,
                            start_date: result[i].start_date,
                            end_date: result[i].end_date
                        }],
                        description: result[i].description,
                        itinerary: result[i].itinerary,
                        price_includes: result[i].price_includes,
                        price_excludes: result[i].price_excludes,
                        faq: result[i].faq
                    })
                    iterator++
                }
            }

            if (result.length > 0){
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