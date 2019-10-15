var express = require('express')
var router = express.Router()
const { pictureController } = require('../controllers')

router.get('/pictures', pictureController.getPictures)
router.get('/pictures/:id', pictureController.getPictures)
module.exports = router