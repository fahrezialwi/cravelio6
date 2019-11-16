let express = require('express')
let router = express.Router()
let verifyToken = require('../helpers/verifyToken')
const { tripController } = require('../controllers')

router.get('/trips', tripController.getTrips)
router.get('/trips_domestic', tripController.getDomesticTrips)
router.get('/trips_international', tripController.getInternationalTrips)
router.get('/trips/:path', tripController.getTrips)
router.post('/trips', verifyToken, tripController.createTrip)
router.patch('/trips/:id', verifyToken, tripController.editTrip)
router.delete('/trips/:id', verifyToken, tripController.deleteTrip)
module.exports = router