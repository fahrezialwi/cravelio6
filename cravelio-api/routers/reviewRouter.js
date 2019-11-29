let express = require('express')
let router = express.Router()
let uploadReviewPicture = require('../helpers/uploadReviewPicture')
const { verifyToken } = require('../helpers/verifyToken')
const { reviewController } = require('../controllers')

router.get('/reviews', reviewController.getReviews)
router.get('/reviews/:id', reviewController.getReviews)

router.get('/pending_reviews', verifyToken, reviewController.getPendingReviews)
router.get('/pending_reviews/:id', verifyToken, reviewController.getPendingReviews)
router.get('/completed_reviews', verifyToken, reviewController.getCompletedReviews)
router.get('/completed_reviews/:id', verifyToken, reviewController.getCompletedReviews)

router.post('/reviews', verifyToken, reviewController.createReview)
router.get('/reviews_picture', verifyToken, reviewController.getReviewPictures)
router.post('/reviews_picture', uploadReviewPicture.array("filepond", 5), verifyToken, reviewController.createReviewPicture)
router.delete('/reviews_picture', verifyToken, reviewController.cancelCreateReviewPicture)
router.patch('/reviews_picture', verifyToken, reviewController.updateReviewPicture)

router.patch('/reviews/:id', verifyToken, reviewController.editReview)
router.delete('/reviews_picture/:id', verifyToken, reviewController.deletePicture)

module.exports = router