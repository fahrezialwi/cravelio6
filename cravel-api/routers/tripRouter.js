var express = require('express')
var router = express.Router()
const { tripController } = require('../controllers')

router.get('/trips', tripController.trips)
router.get('/trips/:id', tripController.tripDetail)
module.exports = router