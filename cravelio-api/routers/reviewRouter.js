var express = require('express')
var router = express.Router()
const { reviewController } = require('../controllers')

router.get('/reviews', reviewController.getReviews)
router.get('/reviews/:id', reviewController.getReviews)
module.exports = router