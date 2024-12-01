const { renderHome } = require('../controllers/home')

const router = require('express').Router()

router.get('/', renderHome)

module.exports = router
