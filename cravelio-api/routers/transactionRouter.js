var express = require('express')
var router = express.Router()
const { transactionController } = require('../controllers')
var upload = require('../helpers/multer')

router.get('/transactions', transactionController.getTransactions)
router.get('/transactions/:id', transactionController.getTransactions)
router.post('/transactions', transactionController.createTransaction)
router.patch('/transactions/:id', upload.single('browse_file'), transactionController.addTransferProof)
module.exports = router