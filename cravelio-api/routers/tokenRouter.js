let express = require('express')
let router = express.Router()
const { tokenController } = require('../controllers')

router.get('/tokens', tokenController.getTokens)
router.get('/tokens/:id', tokenController.getTokens)
router.post('/tokens', tokenController.createToken)

module.exports = router