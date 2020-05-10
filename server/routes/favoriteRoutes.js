const router = require('express').Router()
const favoriteController = require('../controller/favoriteController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/' , favoriteController.readFavorite)
router.post('/' , favoriteController.createFavorite)
router.get('/:status', favoriteController.readFavoriteStatus)


router.put('/:id' , authorization, favoriteController.updateFavoriteStatus)
router.delete('/:id' , authorization, favoriteController.deleteFavorite)

module.exports = router