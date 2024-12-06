'use strict'

const Blog = require('../models/blog')
const User = require('../models/user.js')

/**
 * Update the reading list count for a blog and associate the user's
 * @param {Object} req - Request object. 
 * @param {Object} res - Response object.
 */
const addToReadingList = async (req, res) => {
    if (!req.session.user) return res.sendStatus(401)

    // Destructure username from session
    const { username } = req.session.user

    // Destructure blogId from request params
    const { blogId } = req.params

    // Find user and check if already reacted to the blog
    const currentUser = await User.findOne({ username }).select('readingList')

    if (currentUser.readingList.includes(blogId)) {
        return res.sendStatus(400)
    }

    // Update current user's reading list and save
    currentUser.readingList.push(blogId)
    await currentUser.save()

    // Find the blog and update its reaction count
    const readingListedBlog = await Blog.findById(blogId)
    .select('totalBookmark')

    readingListedBlog.totalBookmark++
    await readingListedBlog.save()

    res.sendStatus(200)
}

/**
 * Delete the reading list for a blog and associate the user's reading list.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const removeFromReadingList = async (req, res) => {
    if (!req.session.user) return res.sendStatus(401)

    // Destructure username from session
    const { username } = req.session.user

    // Destructure blogId from request params
    const { blogId } = req.params

    // Find user and check if already reacted to the blog
    const currentUser = await User.findOne({ username }).select('readingList')

    if (!currentUser.readingList.includes(blogId)) {
        return res.sendStatus(400)
    }

    // Update current user's reading list and save
    currentUser.readingList.splice(currentUser.readingList.indexOf(blogId), 1)
    await currentUser.save()

    // Find the blog and update its reading list count
    const readingListedBlog = await Blog.findById(blogId).select('totalBookmark')
    
    readingListedBlog.totalBookmark--
    await readingListedBlog.save()

    res.sendStatus(200)
}


module.exports = { addToReadingList, removeFromReadingList }