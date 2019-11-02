let express = require('express')
let router = express.Router()
const { favoriteController } = require('../controllers')

router.get('/favorites', favoriteController.getFavorites)
router.get('/favorites/:id', favoriteController.getFavorites)
router.get('/all_favorites', favoriteController.getAllFavorites)
router.get('/all_favorites/:id', favoriteController.getAllFavorites)
router.post('/favorites', favoriteController.createFavorite)
router.patch('/favorites/:id', favoriteController.deleteFavorite)
module.exports = router