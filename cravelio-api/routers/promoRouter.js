var express = require('express')
var router = express.Router()
const { promoController } = require('../controllers')

router.get('/promos', promoController.getPromos)
router.get('/promos/:id', promoController.getPromos)
router.post('/promos', promoController.createPromo)
module.exports = router