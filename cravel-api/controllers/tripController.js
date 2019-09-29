const db = require('../database')

module.exports = {
    getTrips: (req, res) => {
        db.query(`select * from trips, pictures where trips.trip_id = pictures.trip_id and is_main = 1`, (err, result) => {
            if (err) throw err
            if (result.length > 0){
                let data = result.map(val => {
                    return {
                        trip_id: val.trip_id,
                        name: val.name,
                        meeting_point: val.meeting_point,
                        price: val.price,
                        duration: val.duration,
                        category: val.category,
                        quota: val.quota,
                        picture_main: val.picture_link
                    }
                })
                
                res.send({
                    status: 200,
                    results: data
                })
            } else {
                res.send({
                    status: 404,
                    message: 'Data not found'
                })
            }
        })
    },

    getTripDetail: (req, res) => {
        let sqlAll = `select * from trips t join pictures p on t.trip_id = p.trip_id where t.trip_id = ${req.params.id} and not p.is_main = 1`
        let sqlMain = `select * from trips t join pictures p on t.trip_id = p.trip_id where t.trip_id = ${req.params.id} and p.is_main = 1`

        db.query(sqlAll, (err,result) => {
            db.query(sqlMain, (errMain, resultMain) => {
                if (err) throw err
                if (result.length > 0){
                    let data = {
                        trip_id : result[0].trip_id,
                        name : result[0].name,
                        meeting_point : result[0].meeting_point,
                        price : result[0].price,
                        duration : result[0].duration,
                        category : result[0].category,
                        quota : result[0].quota,
                        picture_main: resultMain[0].picture_link,
                        pictures: []
                    }

                    result.forEach(val => {
                        data.pictures.push(val.picture_link)
                    })
                    
                    res.send({
                        status: 200,
                        results: [data]
                    })
                } else {
                    res.send({
                        status: 404,
                        message: 'Data not found'
                    })
                }
            })
        })
    }
}