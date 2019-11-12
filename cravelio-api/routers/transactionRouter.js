let express = require('express')
let router = express.Router()
let uploadProof = require('../helpers/uploadProof')
const { transactionController } = require('../controllers')

router.get('/transactions', transactionController.getTransactions)
router.get('/transactions/:id', transactionController.getTransactions)
router.post('/transactions', transactionController.createTransaction)
router.patch('/transactions/:id', uploadProof.single('browse_file'), transactionController.addTransferProof)
router.patch('/approve_transaction/:id', transactionController.approveTransaction)
router.patch('/reject_transaction/:id', transactionController.rejectTransaction)
router.post('/send_purchase_approved', transactionController.sendPurchaseApproved)
router.post('/send_purchase_rejected', transactionController.sendPurchaseRejected)

module.exports = router