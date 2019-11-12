let express = require('express')
let router = express.Router()
const { authController } = require('../controllers')

router.get('/users', authController.getUsers)
router.get('/users/:id', authController.getUsers)
router.post('/users', authController.createUser)
router.put('/users/:id', authController.editUser)
router.get('/login', authController.loginUser)
router.post('/send_verification_link', authController.sendVerificationLink)
router.get('/check_verification_link', authController.checkVerificationLink)
router.patch('/verify_user', authController.verifyUser)
router.post('/send_password_link', authController.sendPasswordLink)
router.get('/check_password_link', authController.checkPasswordLink)
router.patch('/reset_password', authController.resetPassword)

module.exports = router