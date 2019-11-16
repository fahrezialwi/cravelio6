let express = require('express')
let router = express.Router()
let uploadTripPicture = require('../helpers/uploadTripPicture')
let verifyToken = require('../helpers/verifyToken')
const { pictureController } = require('../controllers')

router.get('/pictures', pictureController.getPictures)
router.get('/pictures/:id', pictureController.getPictures)
router.post('/pictures', verifyToken, uploadTripPicture.array("filepond", 5), pictureController.createPicture)
router.delete('/pictures', verifyToken, pictureController.cancelCreatePicture)
router.patch('/pictures/:id', verifyToken, pictureController.setMainPicture)
router.delete('/pictures/:id', verifyToken, pictureController.deletePicture)

module.exports = router