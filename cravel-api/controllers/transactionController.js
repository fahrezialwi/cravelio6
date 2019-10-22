const db = require('../database')

module.exports = {
    getTransactions: (req, res) => {
        let sql = `select tr.transaction_id, tr.trip_id, t.trip_name, tr.start_date, tr.end_date,
        tr.user_id, tr.contact_first_name, tr.contact_last_name, tr.contact_phone_number, tr.contact_email, tr.pax,
        tr.total_payment, tr.status, tr.transfer_bank_name, tr.transfer_account_holder, tr.transfer_proof, tr.created_at,
        td.title, td.first_name, td.last_name, td.identification_type, td.identification_number
        from transactions as tr 
        join trips as t on tr.trip_id = t.trip_id
        join transactions_detail as td on tr.transaction_id = td.transaction_id`

        if (req.params.id){
            sql = `${sql} where tr.transaction_id = ${req.params.id}`
        }
        if (req.query.status){
            sql = `${sql} where tr.status = '${req.query.status}'`
        }
        if (req.query.year){
            sql = `${sql} where year(tr.created_at) = ${req.query.year}`
        }

        db.query(sql, (err,result) => {
            if (err) throw err
            
            let data = []
            let iterator = 0

            for (let i = 0; i < result.length; i++) {
                if (i == 0){
                    data.push({
                        transaction_id: result[0].transaction_id,
                        trip_id: result[0].trip_id,
                        trip_name: result[0].trip_name,
                        start_date: result[0].start_date,
                        end_date: result[0].end_date,
                        user_id: result[0].user_id,
                        contact_first_name: result[0].contact_first_name,
                        contact_last_name: result[0].contact_last_name,
                        contact_phone_number: result[0].contact_phone_number,
                        contact_email: result[0].contact_email,
                        pax: result[0].pax,
                        participants: [{
                            title: result[0].title,
                            first_name: result[0].first_name,
                            last_name: result[0].last_name,
                            identification_type: result[0].identification_type,
                            identification_number: result[0].identification_number
                        }],
                        total_payment: result[0].total_payment,
                        status: result[0].status,
                        transfer_bank_name: result[0].transfer_bank_name,
                        transfer_account_holder: result[0].transfer_account_holder,
                        transfer_proof: result[0].transfer_proof,
                        created_at: result[0].created_at
                    })
                    iterator++
                    continue
                }

                if (result[i].transaction_id == result[i-1].transaction_id){
                    data[iterator - 1].participants.push({
                        title: result[i].title,
                        first_name: result[i].first_name,
                        last_name: result[i].last_name,
                        identification_type: result[i].identification_type,
                        identification_number: result[i].identification_number
                    })
                } else {
                    data.push({
                        transaction_id: result[i].transaction_id,
                        trip_id: result[i].trip_id,
                        trip_name: result[i].trip_name,
                        start_date: result[i].start_date,
                        end_date: result[i].end_date,
                        user_id: result[i].user_id,
                        contact_first_name: result[i].contact_first_name,
                        contact_last_name: result[i].contact_last_name,
                        contact_phone_number: result[i].contact_phone_number,
                        contact_email: result[i].contact_email,
                        pax: result[i].pax,
                        participants: [{
                            title: result[i].title,
                            first_name: result[i].first_name,
                            last_name: result[i].last_name,
                            identification_type: result[i].identification_type,
                            identification_number: result[i].identification_number
                        }],
                        total_payment: result[i].total_payment,
                        status: result[i].status,
                        transfer_bank_name: result[i].transfer_bank_name,
                        transfer_account_holder: result[i].transfer_account_holder,
                        transfer_proof: result[i].transfer_proof,
                        created_at: result[i].created_at
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
                    message: 'Data not found',
                    results: result
                })
            }
        })
    },

    createTransaction: (req, res) => {
        db.query(
            `insert into transactions (trip_id, trip_name, start_date, end_date, user_id, contact_first_name, contact_last_name, contact_phone_number, contact_email, pax, total_payment, status, created_at)
            values (${req.body.trip_id}, '${req.body.trip_name}', '${req.body.start_date}', '${req.body.end_date}', ${req.body.user_id}, '${req.body.contact_first_name}', '${req.body.contact_last_name}', '${req.body.contact_phone_number}', '${req.body.contact_email}', ${req.body.pax}, ${req.body.total_payment}, '${req.body.status}', '${req.body.created_at}')`, (err, result) => {
            
            if (err) throw err
            res.send({
                status: 201,
                message: 'Transaction created',
                results: result
            })
            
            for (let i = 1; i <= req.body.pax ; i++){
                db.query(`insert into transactions_detail (transaction_id, title, first_name, last_name, identification_type, identification_number) values ((select transaction_id from transactions where created_at = '${req.body.created_at}'), '${req.body.participants["title"+i]}', '${req.body.participants["firstName"+i]}', '${req.body.participants["lastName"+i]}', '${req.body.participants["idType"+i]}', ${req.body.participants["idNumber"+i]})`)
            }
        })
    }
}