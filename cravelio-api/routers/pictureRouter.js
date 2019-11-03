let express = require('express')
let router = express.Router()
let uploadPictureTrip = require('../helpers/uploadPictureTrip')
const { pictureController } = require('../controllers')

router.get('/pictures', pictureController.getPictures)
router.get('/pictures/:id', pictureController.getPictures)
router.post('/pictures', uploadPictureTrip.array("filepond", 5), pictureController.createPicture)
router.patch('/pictures', pictureController.setMainPicture)
router.delete('/pictures', pictureController.deletePicture)

module.exports = router