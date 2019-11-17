let express = require('express')
let router = express.Router()
let uploadProfilePicture = require('../helpers/uploadProfilePicture')
let { verifyToken, verifyTokenAdmin } = require('../helpers/verifyToken')
const { userController } = require('../controllers')

router.get('/users', verifyTokenAdmin, userController.getUsers)

router.get('/users_email', userController.getUserByEmail)
router.post('/users', userController.createUser)
router.post('/send_verification_link', userController.sendVerificationLink)
router.get('/check_verification_link', userController.checkVerificationLink)
router.patch('/verify_user', userController.verifyUser)

router.get('/login', userController.loginUser)
router.get('/users/:id', verifyToken, userController.getUserById)
router.patch('/users/:id', verifyToken, userController.editWithoutProfilePicture)
router.patch('/users_picture/:id', uploadProfilePicture.single('browse_file'), verifyToken, userController.editWithProfilePicture)

router.post('/send_password_link', userController.sendPasswordLink)
router.get('/check_password_link', userController.checkPasswordLink)
router.patch('/reset_password', userController.resetPassword)

module.exports = router