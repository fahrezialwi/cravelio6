let express = require('express')
let router = express.Router()
let uploadProof = require('../helpers/uploadProof')
const { transactionController } = require('../controllers')

router.get('/transactions', transactionController.getTransactions)
router.get('/transactions/:id', transactionController.getTransactions)
router.post('/transactions', transactionController.createTransaction)
router.patch('/transactions/:id', uploadProof.single('browse_file'), transactionController.addTransferProof)
module.exports = router