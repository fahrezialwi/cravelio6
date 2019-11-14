let express = require('express')
let router = express.Router()
let uploadProfilePicture = require('../helpers/uploadProfilePicture')
const { userController } = require('../controllers')

router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUsers)
router.post('/users', userController.createUser)
router.patch('/users/:id', userController.editWithoutProfilePicture)
router.patch('/users_picture/:id', uploadProfilePicture.single('browse_file'), userController.editWithProfilePicture)
router.get('/login', userController.loginUser)
router.post('/send_verification_link', userController.sendVerificationLink)
router.get('/check_verification_link', userController.checkVerificationLink)
router.patch('/verify_user', userController.verifyUser)
router.post('/send_password_link', userController.sendPasswordLink)
router.get('/check_password_link', userController.checkPasswordLink)
router.patch('/reset_password', userController.resetPassword)

module.exports = router