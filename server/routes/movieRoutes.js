const router = require('express').Router()
const movieController = require('../controller/movieController')

router.get('/1/popular', movieController.readPopular)
router.get('/:string/:page', movieController.readById)

module.exports = router