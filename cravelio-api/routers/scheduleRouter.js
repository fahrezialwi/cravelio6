let express = require('express')
let router = express.Router()
const { scheduleController } = require('../controllers')

router.get('/schedules', scheduleController.getSchedules)
router.get('/schedules/:id', scheduleController.getSchedules)
module.exports = router