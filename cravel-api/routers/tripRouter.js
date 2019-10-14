var express = require('express')
var router = express.Router()
const { tripController } = require('../controllers')

router.get('/trips', tripController.getTrips)
router.get('/trips/:path', tripController.getTrips)
router.get('/pictures', tripController.getPictures)
router.get('/pictures/:id', tripController.getPictures)
router.get('/reviews', tripController.getReviews)
router.get('/reviews/:id', tripController.getReviews)
router.get('/schedules', tripController.getSchedules)
router.get('/schedules/:id', tripController.getSchedules)
module.exports = router