let express = require('express')
let router = express.Router()
const { pictureController } = require('../controllers')

router.get('/pictures', pictureController.getPictures)
router.get('/pictures/:id', pictureController.getPictures)
router.post('/pictures', pictureController.createPictures)
router.patch('/pictures/:id', pictureController.editPictures)
module.exports = router