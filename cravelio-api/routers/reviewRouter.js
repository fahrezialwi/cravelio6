let express = require('express')
let router = express.Router()
let uploadReviewPicture = require('../helpers/uploadReviewPicture')
const { reviewController } = require('../controllers')

router.get('/reviews', reviewController.getReviews)
router.get('/reviews/:id', reviewController.getReviews)
router.get('/pending_reviews', reviewController.getPendingReviews)
router.get('/completed_reviews', reviewController.getCompletedReviews)
router.post('/reviews', reviewController.createReview)
router.patch('/reviews_picture', reviewController.updateReviewPicture)
router.post('/reviews_picture', uploadReviewPicture.array("filepond", 5), reviewController.createReviewPicture)
router.delete('/reviews_picture', reviewController.cancelCreateReviewPicture)
router.patch('/reviews/:id', reviewController.editReview)

module.exports = router