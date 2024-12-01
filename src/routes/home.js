const { renderHome } = require('../controllers/home')

const router = require('express').Router()

router.get(['/', '/page/:pageNumber'], renderHome)

module.exports = router
