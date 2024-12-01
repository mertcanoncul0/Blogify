'use strict'

/**
 * Calculates the reading time of a given text.
 * @param {string} text - The text for which reading time is to be calculated.
 * @returns {number} - The estimated reading time in minutes.
 */
const AVG_RAD_WPM = 200
const getReadingTime = (text) => Math.ceil(text.split(' ').length / AVG_RAD_WPM)

module.exports = getReadingTime
