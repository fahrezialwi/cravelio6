var express = require('express')
var router = express.Router()
const { authController } = require('../controllers')

router.get('/users', authController.getUsers)
router.get('/users/:id', authController.getUsers)
router.post('/users', authController.createUser)
router.put('/users/:id', authController.editUser)
router.get('/login', authController.loginUser)

module.exports = router