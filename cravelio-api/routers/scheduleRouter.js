let express = require('express')
let router = express.Router()
let verifyToken = require('../helpers/verifyToken')
const { scheduleController } = require('../controllers')

router.get('/schedules', scheduleController.getSchedules)
router.get('/schedules/:id', scheduleController.getSchedules)
router.post('/schedules', verifyToken, scheduleController.createSchedule)
router.patch('/schedules/:id', verifyToken, scheduleController.editSchedule)
router.delete('/schedules/:id', verifyToken, scheduleController.deleteSchedule)
router.patch('/schedules_quota/:id', verifyToken, scheduleController.editScheduleQuota)

module.exports = router