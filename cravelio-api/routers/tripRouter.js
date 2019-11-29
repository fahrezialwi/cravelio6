let express = require('express')
let router = express.Router()
const { verifyTokenAdmin } = require('../helpers/verifyToken')
const { tripController } = require('../controllers')

router.get('/trips', tripController.getTrips)

router.get('/trips_domestic', tripController.getDomesticTrips)
router.get('/trips_international', tripController.getInternationalTrips)
router.get('/trips/:path', tripController.getTrips)

router.post('/trips', verifyTokenAdmin, tripController.createTrip)
router.patch('/trips/:id', verifyTokenAdmin, tripController.editTrip)
router.delete('/trips/:id', verifyTokenAdmin, tripController.deleteTrip)

module.exports = router