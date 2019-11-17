let express = require('express')
let router = express.Router()
const { verifyToken, verifyTokenAdmin } = require('../helpers/verifyToken')
const { favoriteController } = require('../controllers')

router.get('/all_favorites', verifyTokenAdmin, favoriteController.getAllFavorites)
router.get('/all_favorites/:id', verifyTokenAdmin, favoriteController.getAllFavorites)

router.get('/favorites', verifyToken, favoriteController.getFavorites)
router.get('/favorites/:id', verifyToken, favoriteController.getFavorites)
router.post('/favorites', verifyToken, favoriteController.createFavorite)
router.patch('/favorites/:id', verifyToken, favoriteController.deleteFavorite)

module.exports = router