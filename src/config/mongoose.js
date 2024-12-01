'use strict'

const mongoose = require('mongoose')

/**
 * Client opitons object containing server API configration.
 * @type {ClientOptions}
 */
const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
  dbName: 'blogapp',
}

/**
 * Connect to the mongoDB database using the provided connection string.
 * @param {string} connectionStr - The mongoDB connection string.
 * @returns {Promise<void>} - A promise that resolves when the connection is established.
 * @throws {Error} - Throws an error if the connection fails.
 */
const connectDB = async (connectionURI) => {
  try {
    await mongoose.connect(connectionURI, clientOptions)
    console.log('Connected to the database')
  } catch (error) {
    console.error('Error connecting to the database: ', error.message)
    throw error
  }
}

/**
 * Disconnect from the mongoDB database.
 * @async
 * @function disconnectDB
 * @throws {Error} - Throws an error if the disconnection fails.
 * @returns {Promise<void>} - A promise that resolves when the connection is closed.
 */
const disconnectDB = async () => {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from the database')
  } catch (error) {
    console.error('Error disconnecting from the database: ', error.message)
    throw error
  }
}

module.exports = {
  connectDB,
  disconnectDB,
}
