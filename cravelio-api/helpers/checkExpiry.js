const db = require('../database')
const moment = require('moment')

let checkExpiry = () => {
    db.query(
        `SELECT * FROM transactions WHERE status = 'Pending'
        AND created_at < '${moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss.SSS')}'`, (err, result) => {
        
        try {
            if (err) throw err
        
            if (result.length > 0) {          
                for (let i = 0 ; i < result.length ; i++) {
                    db.query(`UPDATE transactions SET status = 'Cancelled' WHERE transaction_id = ${result[i].transaction_id}`)
                }
            }
        } catch(err) {
            console.log(err)
        }
    })
}

module.exports = checkExpiry