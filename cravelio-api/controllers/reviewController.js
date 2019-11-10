const db = require('../database')
const moment = require('moment')
const fs = require('fs')

module.exports = {
    getReviews: (req, res) => {
        let sql = `SELECT r.review_id, r.trip_id, r.user_id, u.first_name, u.last_name, u.profile_picture,
        r.review_content, r.star, rp.picture_link, r.created_at, r.updated_at FROM reviews AS r
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
                        profile_picture: result[0].profile_picture,
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
                        profile_picture: result[i].profile_picture,
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
        let sql =  `SELECT tr.transaction_id, tr.user_id, t.trip_id, t.path, t.trip_name, p.picture_link,
        tr.start_date, tr.end_date, tr.pax, tr.total_payment, tr.created_at
        FROM transactions AS tr
        JOIN trips AS t ON tr.trip_id = t.trip_id
        JOIN pictures AS p ON tr.trip_id = p.trip_id
        WHERE tr.status = 'Completed'
        AND (SELECT COUNT(*) FROM reviews AS r WHERE r.transaction_id = tr.transaction_id) = 0
        AND p.is_main = 1`

        if (req.query.user_id) {
            sql = `${sql} AND tr.user_id = ${req.query.user_id}`
        }

        if (req.params.id) {
            sql = `${sql} AND tr.transaction_id = ${req.params.id}`
        }

        sql += ` ORDER BY tr.created_at DESC`

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

    getCompletedReviews: (req, res) => {
        let sql = `SELECT r.review_id, tr.transaction_id, r.trip_id, t.path, t.trip_name,
        tr.start_date, tr.end_date, p.picture_link as main_picture,
        r.user_id, r.transaction_id, r.review_content, r.star,
        rp.picture_link, r.created_at, r.updated_at FROM reviews AS r
        JOIN transactions as tr on r.transaction_id = tr.transaction_id
        JOIN trips AS t ON r.trip_id = t.trip_id
        JOIN pictures AS p ON r.trip_id = p.trip_id
        LEFT JOIN reviews_picture AS rp ON r.review_id = rp.review_id
        WHERE p.is_main = 1`

        if (req.query.user_id) {
            sql = `${sql} AND r.user_id = ${req.query.user_id}`
        }

        if (req.params.id) {
            sql = `${sql} AND r.review_id = ${req.params.id}`
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
                        transaction_id: result[0].transaction_id,
                        trip_id: result[0].trip_id,
                        path: result[0].path,
                        trip_name: result[0].trip_name,
                        start_date: result[0].start_date,
                        end_date: result[0].end_date,
                        main_picture: result[0].main_picture,
                        user_id: result[0].user_id,
                        transaction_id: result[0].transaction_id,
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
                        transaction_id: result[i].transaction_id,
                        trip_id: result[i].trip_id,
                        path: result[i].path,
                        trip_name: result[i].trip_name,
                        start_date: result[i].start_date,
                        end_date: result[i].end_date,
                        main_picture: result[i].main_picture,
                        user_id: result[i].user_id,
                        transaction_id: result[i].transaction_id,
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

    createReview: (req, res) => {
        let sql = `INSERT INTO reviews (review_id, review_content, star,
        trip_id, user_id, transaction_id, created_at, updated_at) VALUES (0, '${req.body.review_content}',
        ${req.body.star}, ${req.body.trip_id}, ${req.body.user_id}, ${req.body.transaction_id},
        '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}', 
        '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}')`

        db.query(sql, (err, result) => {
            if (err) throw err

            res.send({
                status: 201,
                message: 'Create review success',
                results: result
            })
        })
    },

    getReviewPictures: (req, res) => {
        let sql = `SELECT * FROM reviews_picture 
        WHERE transaction_id = ${req.query.transaction_id}`

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

    updateReviewPicture: (req, res) => {
        let sql = `UPDATE reviews_picture SET review_id = ${req.body.review_id}
        WHERE transaction_id = ${req.body.transaction_id}`
        
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send({
                status: 201,
                message: 'Update review picture success',
                results: result
            })
        })
    },

    createReviewPicture: (req, res) => {
        let sql = `INSERT INTO reviews_picture (review_picture_id, picture_link, transaction_id)
        VALUES (0, '${req.files[0].filename}', ${req.body.transaction_id})`

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
        let sql = `UPDATE reviews SET review_content = '${req.body.review_content}',
        star = ${req.body.star} WHERE review_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            if (err) throw err

            res.send({
                status: 201,
                message: 'Edit review success',
                results: result
            })
        })
    },

    deletePicture: (req, res) => {
        let sql = `DELETE FROM reviews_picture WHERE review_picture_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            if (err) throw err  
            fs.unlinkSync(`./uploads/review-pictures/${req.body.picture_link}`)
            res.send({
                status: 200,
                message: 'Delete picture success',
                results: result
            })
        })
    }
}