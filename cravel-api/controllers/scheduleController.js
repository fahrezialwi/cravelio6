const db = require('../database')

module.exports = {
    getSchedules: (req, res) => {
        let sql = `select schedule_id, s.trip_id, trip_name, start_date, end_date from schedules as s join trips as t on s.trip_id = t.trip_id`
        if (req.params.id){
            sql = `${sql} where schedule_id = ${req.params.id}`
        }
        if (req.query.trip_id){
            sql = `${sql} where s.trip_id = ${req.query.trip_id}`
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
                    message: 'Data not found'
                })
            }
        })
    }
}