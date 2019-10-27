var express = require('express')
var router = express.Router()
const { authController } = require('../controllers')

router.get('/users', authController.getUsers)
router.get('/users/:id', authController.getUsers)
router.post('/users', authController.createUser)
router.put('/users/:id', authController.editUser)
router.get('/login', authController.loginUser)
router.post('/send-verification-link', authController.sendVerificationLink)
router.get('/check-verification-link', authController.checkVerificationLink)
router.patch('/verify-user', authController.verifyUser)
router.post('/send-password-link', authController.sendPasswordLink)
router.get('/check-password-link', authController.checkPasswordLink)
router.patch('/reset-password', authController.resetPassword)

module.exports = router