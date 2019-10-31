let express = require('express')
let router = express.Router()
const { tripController } = require('../controllers')

router.get('/trips', tripController.getTrips)
router.get('/trips/:path', tripController.getTrips)
module.exports = router