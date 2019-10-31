let express = require('express')
let router = express.Router()
const { reviewController } = require('../controllers')

router.get('/reviews', reviewController.getReviews)
router.get('/reviews/:id', reviewController.getReviews)
module.exports = router