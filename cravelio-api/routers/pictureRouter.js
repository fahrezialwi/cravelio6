let express = require('express')
let router = express.Router()
let uploadTripPicture = require('../helpers/uploadTripPicture')
const { verifyTokenAdmin } = require('../helpers/verifyToken')
const { pictureController } = require('../controllers')

router.get('/pictures', pictureController.getPictures)
router.get('/pictures/:id', pictureController.getPictures)

router.post('/pictures', uploadTripPicture.array("filepond", 5), verifyTokenAdmin, pictureController.createPicture)
router.delete('/pictures', verifyTokenAdmin, pictureController.cancelCreatePicture)
router.patch('/pictures/:id', verifyTokenAdmin, pictureController.setMainPicture)
router.delete('/pictures/:id', verifyTokenAdmin, pictureController.deletePicture)

module.exports = router