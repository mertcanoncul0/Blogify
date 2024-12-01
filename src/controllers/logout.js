'use strict'
/**
 * Logout the user by destroying the session and redirecting to the home page.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const logout = async (req, res) => {
    // Destroy the session
    req.session.destroy()
    res.redirect('/login')
}

module.exports = {
    logout,
}