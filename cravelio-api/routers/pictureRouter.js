let express = require('express')
let router = express.Router()
let uploadTripPicture = require('../helpers/uploadTripPicture')
const { pictureController } = require('../controllers')

router.get('/pictures', pictureController.getPictures)
router.get('/pictures/:id', pictureController.getPictures)
router.post('/pictures', uploadTripPicture.array("filepond", 5), pictureController.createPicture)
router.delete('/pictures', pictureController.cancelCreatePicture)
router.patch('/pictures/:id', pictureController.setMainPicture)
router.delete('/pictures/:id', pictureController.deletePicture)

module.exports = router