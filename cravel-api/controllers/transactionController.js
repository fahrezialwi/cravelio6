const db = require('../database')

module.exports = {
    getTransactions: (req, res) => {
        let sql = `select tr.transaction_id, tr.user_id, u.first_name, u.last_name, tr.trip_id, t.trip_name, tr.phone_number,
        tr.pax, tr.status, tr.transfer_bank_name, tr.transfer_account_holder, tr.transfer_proof, tr.created_at
        from transactions as tr 
        join trips as t on tr.trip_id = t.trip_id
        join users as u on tr.user_id = u.user_id`

        if (req.params.id){
            sql = `${sql} where tr.transaction_id = ${req.params.id}`
        }
        if (req.query.status){
            sql = `${sql} where tr.status = '${req.query.status}'`
        }
        if (req.query.year){
            sql = `${sql} where year(tr.created_at) = ${req.query.year}`
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
                    message: 'Data not found',
                    results: result
                })
            }
        })
    }

    // createTransaction: (req, res) => {
    //     db.query(`insert into users (first_name, last_name, email, password) values ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`, (err, result) => {
    //         db.query(`insert into users (first_name, last_name, email, password) values ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`, (err2, result2) => {
    //             if (err) throw err
    //             if (err2) throw err2
    //             res.send({
    //                 status: 201,
    //                 message: 'Transaction created'
    //             })
    //         })

    //     })
    // }
}