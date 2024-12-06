'use strict'

const { renderBlogDetail } = require('../controllers/blog-detail')
const { updateReaction, deleteReaction } = require('../controllers/reaction')
 
const router = require('express').Router()

router.get('/:blogId', renderBlogDetail)

router.put('/:blogId/reactions', updateReaction)

router.delete('/:blogId/reactions', deleteReaction)

module.exports = router
