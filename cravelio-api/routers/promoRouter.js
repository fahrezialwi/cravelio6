let express = require('express')
let router = express.Router()
const { promoController } = require('../controllers')

router.get('/promos', promoController.getPromos)
router.get('/promos/:id', promoController.getPromos)
router.post('/promos', promoController.createPromo)
router.patch('/promos/:id', promoController.editPromo)
router.delete('/promos/:id', promoController.deletePromo)

module.exports = router