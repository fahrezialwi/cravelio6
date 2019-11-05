let express = require('express')
let router = express.Router()
const { scheduleController } = require('../controllers')

router.get('/schedules', scheduleController.getSchedules)
router.get('/schedules/:id', scheduleController.getSchedules)
router.post('/schedules', scheduleController.createSchedule)
router.patch('/schedules/:id', scheduleController.editSchedule)
router.delete('/schedules/:id', scheduleController.deleteSchedule)
module.exports = router