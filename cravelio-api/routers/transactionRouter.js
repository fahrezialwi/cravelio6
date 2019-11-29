let express = require('express')
let router = express.Router()
let uploadProof = require('../helpers/uploadProof')
const { verifyToken, verifyTokenAdmin } = require('../helpers/verifyToken')
const { transactionController } = require('../controllers')

router.get('/transactions', verifyTokenAdmin, transactionController.getTransactions)
router.get('/transactions/:id', verifyToken, transactionController.getTransactions)

router.get('/transactions_user', verifyToken, transactionController.getTransactionsByUserId)
router.post('/transactions', verifyToken, transactionController.createTransaction)
router.patch('/transactions/:id', uploadProof.single('browse_file'), verifyToken, transactionController.addTransferProof)

router.patch('/approve_transaction/:id', verifyTokenAdmin, transactionController.approveTransaction)
router.patch('/reject_transaction/:id', verifyTokenAdmin, transactionController.rejectTransaction)
router.post('/send_purchase_approved', verifyTokenAdmin, transactionController.sendPurchaseApproved)
router.post('/send_purchase_rejected', verifyTokenAdmin, transactionController.sendPurchaseRejected)

module.exports = router