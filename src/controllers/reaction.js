'use strict'

const Blog = require('../models/blog')
const User = require('../models/user.js')

/**
 * Update the reaction count for a blog and associate the user's
 * @param {Object} req - Request object. 
 * @param {Object} res - Response object.
 */
const updateReaction = async (req, res) => {
    if (!req.session.user) return res.sendStatus(401)

    // Destructure username from session
    const { username } = req.session.user

    // Destructure blogId from request params
    const { blogId } = req.params

    // Find user and check if already reacted to the blog
    const currentUser = await User.findOne({ username }).select('reactedBlogs')

    if (currentUser.reactedBlogs.includes(blogId)) {
        return res.sendStatus(400)
    }

    // Find the blog and update its reaction count
    const reactedBlog = await Blog.findById(blogId)
    .select('reaction owner')
    .populate({
        path: 'owner',
        select: 'totalReactions'
    })

    reactedBlog.reaction++
    await reactedBlog.save()

    // Update current user's reactedBlogs list and save
    currentUser.reactedBlogs.push(reactedBlog._id)
    await currentUser.save()

    // Update blog author's total reaction list and save
    reactedBlog.owner.totalReactions++
    await reactedBlog.owner.save()

    res.sendStatus(200)
}

/**
 * Delete the reaction for a blog and associate the user's reaction.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const deleteReaction = async (req, res) => {
    if (!req.session.user) return res.sendStatus(401)

    // Destructure username from session
    const { username } = req.session.user

    // Destructure blogId from request params
    const { blogId } = req.params

    // Find user and check if already reacted to the blog
    const currentUser = await User.findOne({ username }).select('reactedBlogs')

    if (!currentUser.reactedBlogs.includes(blogId)) {
        return res.sendStatus(400)
    }

    // Find the blog and update its reaction count
    const reactedBlog = await Blog.findById(blogId)
    .select('reaction owner')
    .populate({
        path: 'owner',
        select: 'totalReactions'
    })

    reactedBlog.reaction--
    await reactedBlog.save()

    // Update current user's reactedBlogs list and save
    currentUser.reactedBlogs.splice(currentUser.reactedBlogs.indexOf(blogId), 1)
    await currentUser.save()

    // Update blog author's total reaction list and save
    reactedBlog.owner.totalReactions--
    await reactedBlog.owner.save()

    res.sendStatus(200)
}

module.exports = {
    updateReaction,
    deleteReaction
}