const db = require('../database')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const moment = require('moment')
const URL_APP = require('../configs/urlApp')
const mailPassword = require('../configs/mailPassword')
const emailSecretKey = require('../configs/emailSecretKey')

let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: 'donotreply@cravelio.com',
        pass: mailPassword
    }
})

module.exports = {
    getUsers: (req, res) => {
        let sql = `SELECT * FROM users`
        if (req.params.id) {
            sql = `${sql} WHERE user_id = ${req.params.id}`
        }
        if (req.query.email) {
            sql = `${sql} WHERE email = '${req.query.email}'`
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
                    message: 'User not found',
                    results: result
                })
            }
        })
    },

    createUser: (req, res) => {
        let sql = `INSERT INTO users (first_name, last_name, email, password, is_verified, created_at, updated_at)
        VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', 
        '${req.body.password}', 0, '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}',
        '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}')`

        db.query(sql, (err, result) => {
            if (err) throw err
            res.send({
                status: 201,
                message: 'Create user success',
                results: result
            })
        })
    },

    loginUser: (req, res) => {
        db.query(`SELECT * FROM users WHERE email = '${req.query.email}' AND password = '${req.query.password}'`, (err, result) => {

            if (err) throw err
            if (result.length > 0) {
                res.send({
                    status: 200,
                    results: result
                })
            } else {
                res.send({
                    status: 401,
                    message: 'Wrong email or password',
                    results: result
                })
            }
        })
    },

    editWithoutProfilePicture: (req, res) => {
   
        let sql = `UPDATE users SET first_name = '${req.body.first_name}',
        last_name = '${req.body.last_name}', email = '${req.body.email}',
        password = '${req.body.password}', updated_at = '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}',`

        if (req.body.birth_date) {
            sql += ` birth_date = '${req.body.birth_date}',`
        }

        if (req.body.address) {
            sql += ` address = '${req.body.address}',`
        }

        if (req.body.phone_number) {
            sql += ` phone_number = '${req.body.phone_number}',`
        }

        sql = sql.slice(0, -1)
        sql += ` WHERE user_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            if (err) throw err
            
            res.send({
                status: 201,
                message: 'Edit profile success',
                results: result
            })
        }) 
    },

    editWithProfilePicture: (req, res) => {
        try {
            if (req.validation) throw req.validation
            if (req.file.size > 5000000) throw {error: true, message: 'Image size too large'}

            let data = JSON.parse(req.body.data)

            let sql = `UPDATE users SET first_name = '${data.first_name}',
            last_name = '${data.last_name}', email = '${data.email}',
            password = '${data.password}', updated_at = '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}',`
    
            if (data.profile_picture) {
                sql += ` profile_picture = '${req.file.filename}',`
            }
    
            if (data.birth_date) {
                sql += ` birth_date = '${data.birth_date}',`
            }
    
            if (data.address) {
                sql += ` address = '${data.address}',`
            }
    
            if (data.phone_number) {
                sql += ` phone_number = '${data.phone_number}',`
            }
    
            sql = sql.slice(0, -1)
            sql += ` WHERE user_id = ${req.params.id}`

            db.query(sql, (err, result) => {
                try {
                    if (err) throw err
                    res.send({
                        status: 201,
                        message: 'Edit profile success',
                        results: result
                    })
                } catch (error) {
                    // delete file when query/database error
                    fs.unlinkSync(req.file.path)
                    console.log(error)                
                }
            })
        } catch (error) {
            // delete file if file size more than 5MB
            fs.unlinkSync(req.file.path)
            console.log(error)
        }
    },

    sendVerificationLink: (req, res) => {
        let info = {}
        info.email = req.body.email
        info.expiry = new Date(new Date().getTime() +  60 * 60 * 1000)

        let token = jwt.sign(info, emailSecretKey)

        let mailOptions = {
            from: 'Cravelio <donotreply@cravelio.com>',
            to: req.body.email,
            subject: 'Verify your account',
            html: `<p>To verify your account, visit the following address:</p><a href='${URL_APP}verify?key=${token}'>Verify your account</a>`
        }
        
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err
        })

        res.send({
            status: 201,
            message: 'Email sent'
        })  
    },

    checkVerificationLink: (req, res) => {
        let token = req.query.token
        let data = jwt.verify(token, emailSecretKey)
        
        if (new Date(data.expiry) > new Date()) {
            res.send({
                status: 200,
                message: 'Link is active'
            })
        } else {
            res.send({
                status: 404,
                message: 'Link has expired'
            })
        }
    },

    verifyUser: (req, res) => {
        let token = req.body.token
        let data = jwt.verify(token, emailSecretKey)

        db.query(`UPDATE users SET is_verified = 1 WHERE email = '${data.email}'`, (err, result) => {
            if (err) throw err
            res.send('Your account has been verified')
        })
    },

    sendPasswordLink: (req, res) => {
        let info = {}
        info.email = req.body.email
        info.expiry = new Date(new Date().getTime() +  10 * 60 * 1000)

        let token = jwt.sign(info, emailSecretKey)

        let mailOptions = {
            from: 'Cravelio <donotreply@cravelio.com>',
            to: req.body.email,
            subject: 'Forgot Password',
            html: `<p>To reset your password, visit the following address:</p><a href='${URL_APP}reset-password?key=${token}'>Reset your password</a>`
        }
        
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err
        })

        res.send({
            status: 201,
            message: 'Email sent'
        })  
    },

    checkPasswordLink: (req, res) => {
        let token = req.query.token
        let data = jwt.verify(token, emailSecretKey)
        
        if (new Date(data.expiry) > new Date()) {
            res.send({
                status: 200,
                message: 'Link is active'
            })
        } else {
            res.send({
                status: 404,
                message: 'Link has expired'
            })
        }
    },

    resetPassword: (req, res) => {
        let token = req.body.token
        let data = jwt.verify(token, emailSecretKey)

        db.query(`UPDATE users SET password = '${req.body.password}' WHERE email = '${data.email}'`, (err, result) => {

            if (err) throw err
            if (result.length > 0) {
                res.send({
                    status: 200,
                    results: result
                })
            } else {
                res.send({
                    status: 401,
                    message: 'Error resetting password',
                    results: result
                })
            }
        })
    }
}