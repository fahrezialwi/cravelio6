var express = require('express')
var router = express.Router()
const { tripController } = require('../controllers')

router.get('/trips', tripController.getTrips)
router.get('/trips/:id', tripController.getTripDetail)
module.exports = router