let express = require('express')
let router = express.Router()
let verifyToken = require('../helpers/verifyToken')
const { promoController } = require('../controllers')

router.get('/promos', promoController.getPromos)
router.get('/promos/:id', promoController.getPromos)
router.post('/promos', verifyToken, promoController.createPromo)
router.patch('/promos/:id', verifyToken, promoController.editPromo)
router.delete('/promos/:id', verifyToken, promoController.deletePromo)

module.exports = router