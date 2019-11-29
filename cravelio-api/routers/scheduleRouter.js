let express = require('express')
let router = express.Router()
const { verifyToken, verifyTokenAdmin } = require('../helpers/verifyToken')
const { scheduleController } = require('../controllers')

router.get('/schedules', scheduleController.getSchedules)
router.get('/schedules/:id', scheduleController.getSchedules)

router.post('/schedules', verifyTokenAdmin, scheduleController.createSchedule)
router.patch('/schedules/:id', verifyTokenAdmin, scheduleController.editSchedule)
router.delete('/schedules/:id', verifyTokenAdmin, scheduleController.deleteSchedule)
router.patch('/subtract_schedules_quota/:id', verifyToken, scheduleController.editScheduleQuota)
router.patch('/add_schedules_quota/:id', verifyTokenAdmin, scheduleController.editScheduleQuota)

module.exports = router