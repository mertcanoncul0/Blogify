'use strict'

const { renderBlogDetail } = require('../controllers/blog-detail')
const { updateReaction, deleteReaction } = require('../controllers/reaction')
const { addToReadingList, removeFromReadingList } = require('../controllers/reading-list')
 
const router = require('express').Router()

router.get('/:blogId', renderBlogDetail)

// Reactions
router.put('/:blogId/reactions', updateReaction)
router.delete('/:blogId/reactions', deleteReaction)

// Reading List
router.put('/:blogId/reading-list', addToReadingList)
router.delete('/:blogId/reading-list', removeFromReadingList)

module.exports = router
