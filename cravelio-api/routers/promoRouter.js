let express = require('express')
let router = express.Router()
const { verifyTokenAdmin } = require('../helpers/verifyToken')
const { promoController } = require('../controllers')

router.get('/promos', promoController.getPromos)
router.get('/promos/:id', promoController.getPromos)

router.post('/promos', verifyTokenAdmin, promoController.createPromo)
router.patch('/promos/:id', verifyTokenAdmin, promoController.editPromo)
router.delete('/promos/:id', verifyTokenAdmin, promoController.deletePromo)

module.exports = router