let express = require('express')
let router = express.Router()
let uploadProfilePicture = require('../helpers/uploadProfilePicture')
const { authController } = require('../controllers')

router.get('/users', authController.getUsers)
router.get('/users/:id', authController.getUsers)
router.post('/users', authController.createUser)
router.patch('/users/:id', authController.editWithoutProfilePicture)
router.patch('/users_picture/:id', uploadProfilePicture.single('browse_file'), authController.editWithProfilePicture)
router.get('/login', authController.loginUser)
router.post('/send_verification_link', authController.sendVerificationLink)
router.get('/check_verification_link', authController.checkVerificationLink)
router.patch('/verify_user', authController.verifyUser)
router.post('/send_password_link', authController.sendPasswordLink)
router.get('/check_password_link', authController.checkPasswordLink)
router.patch('/reset_password', authController.resetPassword)

module.exports = router