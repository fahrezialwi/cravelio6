var express = require('express')
var router = express.Router()
const { transactionController } = require('../controllers')

router.get('/transactions', transactionController.getTransactions)
router.get('/transactions/:id', transactionController.getTransactions)
// router.post('/transactions', transactionController.createTransaction)
module.exports = router