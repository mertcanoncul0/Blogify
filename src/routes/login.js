'use strict'

const { renderLogin, postLogin } = require('../controllers/login')

const router = require('express').Router()

router.get('/', renderLogin)

router.post('/', postLogin)

module.exports = router
