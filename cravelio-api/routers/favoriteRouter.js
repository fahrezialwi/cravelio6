let express = require('express')
let router = express.Router()
let verifyToken = require('../helpers/verifyToken')
const { favoriteController } = require('../controllers')

router.get('/favorites', favoriteController.getFavorites)
router.get('/favorites/:id', favoriteController.getFavorites)
router.get('/all_favorites', verifyToken, favoriteController.getAllFavorites)
router.get('/all_favorites/:id', verifyToken, favoriteController.getAllFavorites)
router.post('/favorites', verifyToken, favoriteController.createFavorite)
router.patch('/favorites/:id', verifyToken, favoriteController.deleteFavorite)
module.exports = router