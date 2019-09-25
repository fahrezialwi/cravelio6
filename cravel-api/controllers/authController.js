const db = require('../database')

module.exports = {
    login: (req, res) => {
        db.query(`select * from users where email = '${req.query.email}' and password ='${req.query.password}'`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },

    register: (req, res) => {
        db.query(`insert into users (first_name, last_name, email, password
            ) values ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    }
}