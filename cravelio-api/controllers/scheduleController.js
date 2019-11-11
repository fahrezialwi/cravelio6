const db = require('../database')
const moment = require('moment')

module.exports = {
    getSchedules: (req, res) => {
        let sql = `SELECT s.schedule_id, s.trip_id, t.trip_name, t.path, s.start_date, s.end_date, s.quota_left FROM schedules AS s
        JOIN trips AS t ON s.trip_id = t.trip_id`
        
        if (req.params.id) {
            sql = `${sql} WHERE schedule_id = ${req.params.id}`
        }
        if (req.query.trip_id) {
            sql = `${sql} WHERE s.trip_id = ${req.query.trip_id} AND s.start_date > '${moment(new Date()).add(6, 'hours').format('YYYY-MM-DD HH:mm:ss.SSS')}'`
        }
        if (req.query.path) {
            sql = `${sql} WHERE t.path = '${req.query.path}' AND s.start_date > '${moment(new Date()).add(6, 'hours').format('YYYY-MM-DD HH:mm:ss.SSS')}'`
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

    createSchedule: (req, res) => {
        let sql = `INSERT INTO schedules (schedule_id, start_date, end_date, trip_id, quota_left) 
        VALUES (0, '${req.body.start_date}', '${req.body.end_date}', ${req.body.trip_id},
        ${req.body.quota_left})`

        db.query(sql, (err, result) => {
            if (err) throw err

            res.send({
                status: 201,
                message: 'Create schedule success',
                results: result
            })
        })
    },

    editSchedule: (req, res) => {
        let sql = `UPDATE schedules SET start_date = '${req.body.start_date}', 
        end_date = '${req.body.end_date}' WHERE schedule_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            if (err) throw err

            res.send({
                status: 201,
                message: 'Edit schedule success',
                results: result
            })
        })
    },

    deleteSchedule: (req, res) => {
        let sql = `DELETE FROM schedules WHERE schedule_id = ${req.params.id}`
        
        db.query(sql, (err, result) => {
            if (err) throw err

            res.send({
                status: 200,
                message: 'Delete schedule success',
                results: result
            })
        })
    }
}