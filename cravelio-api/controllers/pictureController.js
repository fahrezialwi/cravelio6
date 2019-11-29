const db = require('../database')
const fs = require('fs')

module.exports = {
    getPictures: (req, res) => {
        let sql = `SELECT * FROM pictures`

        if (req.params.id) {
            sql = `${sql} WHERE picture_id = ${req.params.id}`
        }
        if (req.query.trip_id) {
            sql = `${sql} WHERE trip_id = '${req.query.trip_id}'`
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

    createPicture: (req, res) => {
        let sql = `INSERT INTO pictures (picture_id, picture_link, trip_id, is_main) values
        (0, '${req.files[0].filename}', ${req.body.trip_id}, 0)`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err

                res.send(req.files[0].filename)
            } catch(err) {
                console.log(err)
            }
        })
    },

    cancelCreatePicture: (req, res) => {
        let sql = `DELETE FROM pictures WHERE picture_link = '${req.body}'`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err
            
                fs.unlinkSync(`./uploads/trip-pictures/${req.body}`)
                res.send({
                    status: 200,
                    message: 'Cancel create picture success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    },

    setMainPicture: (req, res) => {
        let sql = `UPDATE pictures SET is_main = 0 WHERE trip_id = ${req.body.trip_id}`
        let sql2 = `UPDATE pictures SET is_main = 1 WHERE picture_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err  

                db.query(sql2, (err2, result2) => {
                    try {
                        if (err2) throw err2

                        res.send({
                            status: 200,
                            message: 'Set main picture success',
                            results: result2
                        })
                    } catch(err2) {
                        console.log(err2)
                    }
                })
            } catch(err) {
                console.log(err)
            }
        })
    },

    deletePicture: (req, res) => {
        let sql = `DELETE FROM pictures WHERE picture_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            try {
                if (err) throw err  

                fs.unlinkSync(`./uploads/trip-pictures/${req.body.picture_link}`)
                res.send({
                    status: 200,
                    message: 'Delete picture success',
                    results: result
                })
            } catch(err) {
                console.log(err)
            }
        })
    }
}