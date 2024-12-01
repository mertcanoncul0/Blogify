'use strict'

const { renderCreateBlog, postCreateBlog } = require('../controllers/blog')

const router = require('express').Router()

router.get('/', renderCreateBlog)
router.post('/', postCreateBlog)

module.exports = router
