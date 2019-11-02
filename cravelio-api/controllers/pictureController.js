const db = require('../database')

module.exports = {
    getPictures: (req, res) => {
        let sql = `select * from pictures`
        if (req.params.id){
            sql = `${sql} where picture_id = ${req.params.id}`
        }
        if (req.query.trip_id){
            sql = `${sql} where trip_id = '${req.query.trip_id}'`
        }
        db.query(sql, (err, result) => {
            if (err) throw err
            if (result.length > 0){          
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

    createPictures: (req, res) => {

    },

    editPictures: (req, res) => {
        
    }
}