const db = require('../database')
const moment = require('moment')
const fs = require('fs')

module.exports = {
    getReviews: (req, res) => {
        let sql = `SELECT r.review_id, r.trip_id, r.user_id, u.first_name, u.last_name,
        r.review_title, r.review_content, r.star, rp.picture_link, r.created_at, r.updated_at FROM reviews AS r
        JOIN users AS u ON r.user_id = u.user_id
        LEFT JOIN reviews_picture AS rp ON r.review_id = rp.review_id`

        if (req.params.id) {
            sql = `${sql} WHERE r.review_id = ${req.params.id}`
        }
        if (req.query.trip_id) {
            sql = `${sql} WHERE r.trip_id = ${req.query.trip_id}`
        }

        sql += ` ORDER BY r.created_at DESC`

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
    },

    getCompletedReviews: (req, res) => {
        let sql = `SELECT r.review_id, r.trip_id, t.trip_name, p.picture_link as main_picture,
        r.user_id, r.transaction_id, r.review_title, r.review_content, r.star,
        rp.picture_link, r.created_at, r.updated_at FROM reviews AS r
        JOIN trips AS t ON r.trip_id = t.trip_id
        JOIN pictures AS p ON r.trip_id = p.trip_id
        LEFT JOIN reviews_picture AS rp ON r.review_id = rp.review_id
        WHERE p.is_main = 1`

        if (req.query.user_id) {
            sql = `${sql} AND r.user_id = ${req.query.user_id}`
        }

        sql += ` ORDER BY r.created_at DESC`

        db.query(sql, (err,result) => {
            if (err) throw err
            
            let data = []
            let iterator = 0

            for (let i = 0; i < result.length; i++) {
                if (i == 0) {
                    data.push({
                        review_id: result[0].review_id,
                        trip_id: result[0].trip_id,
                        trip_name: result[0].trip_name,
                        main_picture: result[0].main_picture,
                        user_id: result[0].user_id,
                        transaction_id: result[0].transaction_id,
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
                        trip_name: result[i].trip_name,
                        main_picture: result[i].main_picture,
                        user_id: result[i].user_id,
                        transaction_id: result[i].transaction_id,
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
    },

    getPendingReviews: (req, res) => {
        let sql =  `SELECT transaction_id, trip_id, trip_name, trip_price, picture_link,
        start_date, end_date, pax, total_payment, created_at FROM transactions
        WHERE status = 'Completed' AND has_review = 0`

        if (req.query.user_id) {
            sql = `${sql} AND user_id = ${req.query.user_id}`
        }

        db.query(sql, (err,result) => {
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

    createReview: (req, res) => {
        let sql = `INSERT INTO reviews (review_id, review_title, review_content, star,
        trip_id, user_id, created_at, updated_at) VALUES (0, '${req.body.review_title}', 
        '${req.body.review_content}', '${req.body.star}', '${req.body.trip_id}', '${req.body.user_id}',
        '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}', 
        '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}')`

        let sql2 = `UPDATE transactions SET has_review = 1 WHERE transaction_id = ${req.body.transaction_id}`

        db.query(sql, (err, result) => {
            if (err) throw err

            res.send({
                status: 201,
                message: 'Create review success',
                results: result
            })
        })

        db.query(sql2, (err2, result2) => {
            if (err2) throw err2
        })
    },

    updateReviewPicture: (req, res) => {

        console.log(req.body)

        for ( let i = 0 ; i < req.body.reviews_picture.length ; i++ ) {
            db.query(`UPDATE reviews_picture SET review_id = ${req.body.insert_id}
            WHERE picture_link = '${req.body.reviews_picture[i]}'`)
        }

        res.send({
            status: 201,
            message: 'Update review picture success'
        })
    },

    createReviewPicture: (req, res) => {
        let sql = `INSERT INTO reviews_picture (review_picture_id, picture_link) VALUES
        (0, '${req.files[0].filename}')`

        db.query(sql, (err, result) => {
            if (err) throw err  
            res.send(req.files[0].filename)
        })
    },

    cancelCreateReviewPicture: (req, res) => {
        let sql = `DELETE FROM reviews_picture WHERE picture_link = '${req.body}'`

        db.query(sql, (err, result) => {
            if (err) throw err  
            fs.unlinkSync(`./uploads/review-pictures/${req.body}`)
            res.send({
                status: 200,
                message: 'Cancel create review picture success',
                results: result
            })
        })
    },

    editReview: (req, res) => {
        let sql = `UPDATE reviews SET review_title = '${req.body.review_title}', 
        review_content = '${req.body.review_content}', star = ${req.body.star}
        WHERE review_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            if (err) throw err

            res.send({
                status: 201,
                message: 'Edit review success',
                results: result
            })
        })
    }
}