const db = require('../database')

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
}