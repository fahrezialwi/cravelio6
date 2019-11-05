const db = require('../database')
const fs = require('fs')

module.exports = {
    getPictures: (req, res) => {
        let sql = `select * from pictures`
        if (req.params.id) {
            sql = `${sql} where picture_id = ${req.params.id}`
        }
        if (req.query.trip_id) {
            sql = `${sql} where trip_id = '${req.query.trip_id}'`
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

    createPicture: (req, res) => {
        let sql = `insert into pictures (picture_id, picture_link, trip_id, is_main) values
        (0, '${req.files[0].filename}', ${req.body.trip_id}, 0)`

        db.query(sql, (err, result) => {
            if (err) throw err  
            res.send(req.files[0].filename)
        })
    },

    cancelCreatePicture: (req, res) => {
        let sql = `delete from pictures where picture_link = '${req.body}'`

        db.query(sql, (err, result) => {
            if (err) throw err  
            fs.unlinkSync(`./uploads/trip-pictures/${req.body}`)
            res.send({
                status: 200,
                message: 'Cancel create picture success',
                results: result
            })
        })
    },

    setMainPicture: (req, res) => {
        let sql = `update pictures set is_main = 0 where trip_id = ${req.body.trip_id}`
        let sql2 = `update pictures set is_main = 1 where picture_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            if (err) throw err  

            db.query(sql2, (err2, result2) => {
                if (err2) throw err2
                res.send({
                    status: 201,
                    message: 'Set main picture success',
                    results: result2
                })
            })
        })
    },

    deletePicture: (req, res) => {
        let sql = `delete from pictures where picture_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            if (err) throw err  
            fs.unlinkSync(`./uploads/trip-pictures/${req.body.picture_link}`)
            res.send({
                status: 200,
                message: 'Delete picture success',
                results: result
            })
        })
    }
}