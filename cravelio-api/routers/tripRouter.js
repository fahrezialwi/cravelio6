let express = require('express')
let router = express.Router()
const { tripController } = require('../controllers')

router.get('/trips', tripController.getTrips)
router.get('/trips_domestic', tripController.getDomesticTrips)
router.get('/trips_international', tripController.getInternationalTrips)
router.get('/trips/:path', tripController.getTrips)
router.post('/trips', tripController.createTrip)
router.patch('/trips/:id', tripController.editTrip)
router.delete('/trips/:id', tripController.deleteTrip)
module.exports = router