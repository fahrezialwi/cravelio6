let express = require('express')
let router = express.Router()
let uploadProof = require('../helpers/uploadProof')
let verifyToken = require('../helpers/verifyToken')
const { transactionController } = require('../controllers')

router.get('/transactions', verifyToken, transactionController.getTransactions)
router.get('/transactions/:id', verifyToken, transactionController.getTransactions)
router.post('/transactions', verifyToken, transactionController.createTransaction)
router.patch('/transactions/:id', verifyToken, uploadProof.single('browse_file'), transactionController.addTransferProof)
router.patch('/approve_transaction/:id', verifyToken, transactionController.approveTransaction)
router.patch('/reject_transaction/:id', verifyToken, transactionController.rejectTransaction)
router.post('/send_purchase_approved', verifyToken, transactionController.sendPurchaseApproved)
router.post('/send_purchase_rejected', verifyToken, transactionController.sendPurchaseRejected)

module.exports = router