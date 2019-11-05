const db = require('../database')

module.exports = {
    getReviews: (req, res) => {
        let sql = `SELECT reviews.review_id, trip_id, reviews.user_id, first_name, last_name,
        review_title, review_content, star, picture_link, reviews.created_at, reviews.updated_at FROM reviews
        JOIN users ON reviews.user_id = users.user_id
        LEFT JOIN reviews_picture ON reviews.review_id = reviews_picture.review_id`

        if (req.params.id) {
            sql = `${sql} WHERE reviews.review_id = ${req.params.id}`
        }
        if (req.query.trip_id) {
            sql = `${sql} WHERE trip_id = ${req.query.trip_id}`
        }
        if (req.query.user_id) {
            sql = `${sql} WHERE reviews.user_id = ${req.query.user_id}`
        }

        db.query(sql, (err,result) => {
            if (err) throw err
            
            let data = []
            let iterator = 0

            for (let i = 0; i < result.length; i++) {
                if (i == 0) {
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

                if (result[i].review_id == result[i-1].review_id) {
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

            if (result.length > 0) {          
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
    }
}