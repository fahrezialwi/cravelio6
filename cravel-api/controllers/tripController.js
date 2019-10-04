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
                        picture_main: val.picture_link,
                        meeting_point: val.meeting_point,
                        price: val.price,
                        duration: val.duration,
                        category: val.category,
                        quota: val.quota
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
        let sql = `select * from trips t join pictures p on t.trip_id = p.trip_id where t.trip_id = ${req.params.id} and p.is_main = 1`
        db.query(sql, (err, result) => {
            if (err) throw err
            if (result.length > 0){
                let data = {
                    trip_id: result[0].trip_id,
                    name: result[0].name,
                    picture_main: result[0].picture_link,
                    meeting_point: result[0].meeting_point,
                    price: result[0].price,
                    duration: result[0].duration,
                    category: result[0].category,
                    quota: result[0].quota,
                    description: result[0].description,
                    itinerary: result[0].itinerary,
                    price_includes: result[0].price_includes,
                    price_excludes: result[0].price_excludes,
                    faq: result[0].faq
                }
                
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
    },

    getPictures: (req, res) => {
        let sql = `select * from pictures`
        if (req.params.id){
            sql = `${sql} where picture_id = ${req.params.id}`
        }
        if (req.query.trip_id){
            sql = `${sql} where trip_id = '${req.query.trip_id}' and not is_main = 1`
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
    },

    getReviews: (req, res) => {
        let sql = `select reviews.review_id, trip_id, reviews.user_id, first_name, last_name,
        review_title, review_content, star, picture_link, reviews.created_at, reviews.updated_at from reviews
        join users on reviews.user_id = users.user_id
        left join reviews_picture on reviews.review_id = reviews_picture.review_id`

        if (req.params.id){
            sql = `${sql} where reviews.review_id = ${req.params.id}`
        }
        if (req.query.trip_id){
            sql = `${sql} where trip_id = ${req.query.trip_id}`
        }
        if (req.query.user_id){
            sql = `${sql} where reviews.user_id = ${req.query.user_id}`
        }

        db.query(sql, (err,result) => {
            if (err) throw err
            
            let data = []
            let iterator = 0

            for (let i = 0; i < result.length; i++) {
                if (i == 0){
                    data.push({
                        review_id: result[0].review_id,
                        trip_id: result[0].trip_id,
                        user_id: result[0].user_id,
                        first_name: result[0].first_name,
                        last_name: result[0].last_name,
                        review_title: result[0].review_title,
                        review_content: result[0].review_content,
                        star: result[0].star,
                        pictures : [result[0].picture_link],
                        created_at: result[0].created_at,
                        updated_at: result[0].updated_at
                    })
                    iterator++
                    continue
                }

                if (result[i].review_id == result[i-1].review_id){
                    data[iterator - 1].pictures.push(result[i].picture_link)
                } else {
                    data.push({
                        review_id: result[i].review_id,
                        trip_id: result[i].trip_id,
                        user_id: result[i].user_id,
                        first_name: result[i].first_name,
                        last_name: result[i].last_name,
                        review_title: result[i].review_title,
                        review_content: result[i].review_content,
                        star: result[i].star,
                        pictures : [result[i].picture_link],
                        created_at: result[i].created_at,
                        updated_at: result[i].updated_at
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
                    message: 'Data not found'
                })
            }
        })
    }
}