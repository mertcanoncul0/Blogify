const { renderRegister, postRegister } = require('../controllers/register')

const router = require('express').Router()

router.get('/', renderRegister)

router.post('/', postRegister)

module.exports = router
