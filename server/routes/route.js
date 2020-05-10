const router = require('express').Router()
const userController = require('../controller/userController')
const movieRoute = require('./movieRoutes')
const favoriteRoute = require('./favoriteRoutes')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleLogin', userController.googleLogin)
router.use('/movie', movieRoute)
router.use('/favorite', favoriteRoute)

module.exports = router