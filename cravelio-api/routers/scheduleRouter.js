var express = require('express')
var router = express.Router()
const { scheduleController } = require('../controllers')

router.get('/schedules', scheduleController.getSchedules)
router.get('/schedules/:id', scheduleController.getSchedules)
module.exports = router