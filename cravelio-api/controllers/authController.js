const db = require('../database')
const nodemailer = require('nodemailer')
const URL_APP = require('../configs/urlApp')
const mailPassword = require('../configs/mailPassword')
const emailSecretKey = require('../configs/secretKey')
const jwt = require('jsonwebtoken')

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
        let sql = `select * from users`
        if (req.params.id){
            sql = `${sql} where user_id = ${req.params.id}`
        }
        if (req.query.email){
            sql = `${sql} where email = '${req.query.email}'`
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
                    message: 'User not found',
                    results: result
                })
            }
        })
    },

    createUser: (req, res) => {
        db.query(
            `insert into users (first_name, last_name, email, password)
            values ('${req.body.first_name}', '${req.body.last_name}',
            '${req.body.email}', '${req.body.password}')`, (err, result) => {

            if (err) throw err
            res.send({
                status: 201,
                message: 'Account created'
            })
        })
    },

    loginUser: (req, res) => {
        db.query(`select * from users where email = '${req.query.email}' and password = '${req.query.password}'`, (err, result) => {

            if (err) throw err
            if (result.length > 0){
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

    editUser: (req, res) => {
        let sql = `update users set first_name = '${req.body.first_name}',
        last_name = '${req.body.last_name}', email = '${req.body.email}',
        password = '${req.body.password}', updated_at = '${req.body.updated_at}',`

        if(req.body.profile_picture){
            sql += ` profile_picture = '${req.body.profile_picture}',`
        }

        if(req.body.birth_date){
            sql += ` birth_date = '${req.body.birth_date}',`
        }

        if(req.body.address){
            sql += ` address = '${req.body.address}',`
        }

        if(req.body.phone_number){
            sql += ` phone_number = '${req.body.phone_number}',`
        }

        sql = sql.slice(0, -1)
        sql += ` where user_id = '${req.params.id}'`

        db.query(sql, (err, result) => {
            if (err) throw err
            if (result.length > 0){
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
            status: '201',
            message: 'Email sent'
        })  
    },

    checkPasswordLink: (req, res) => {
        let token = req.query.token
        let data = jwt.verify(token, emailSecretKey)
        
        if(new Date(data.expiry) > new Date()){
            res.send({
                status: 200,
                message: 'Link is active'
            })
        } else {
            res.send({
                status: 404,
                message: 'Link is expired'
            })
        }
    },

    resetPassword: (req, res) => {
        let token = req.body.token
        let data = jwt.verify(token, emailSecretKey)

        db.query(`update users set password = '${req.body.password}' where email = '${data.email}'`, (err, result) => {

            if (err) throw err
            if (result.length > 0){
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