let express = require('express')
let router = express.Router()
const { reviewController } = require('../controllers')

router.get('/reviews', reviewController.getReviews)
router.get('/reviews/:id', reviewController.getReviews)
router.get('/pending_reviews', reviewController.getPendingReviews)
router.post('/reviews', reviewController.createReview)
router.patch('/reviews/:id', reviewController.editReview)

module.exports = router