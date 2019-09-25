const db = require('../database')

module.exports = {
    trips: (req, res) => {
        db.query(`select * from trips, pictures where trips.trip_id = pictures.trip_id and is_main = 1`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    tripDetail: (req, res) => {
        db.query(`select * from trips t
        join pictures p on t.trip_id = p.trip_id
        where t.trip_id = ${req.params.id} and not p.is_main = 1`, (err,result) => {
            
            let data = {
                trip_id : result[0].trip_id,
                name : result[0].name,
                meeting_point : result[0].meeting_point,
                price : result[0].price,
                duration : result[0].duration,
                category : result[0].category,
                quota : result[0].quota,
                pictures: []
            }
            
            result.forEach(val => {
                data.pictures.push(val.picture_link)
            })

            res.send(data)
        })
    },

    pictures: (req, res) => {
        db.query(`select * from pictures where trip_id = ${req.query.trip_id}`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    }
}