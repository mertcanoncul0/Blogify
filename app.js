'use strict'

const express = require('express')
require('dotenv').config()
const { connectDB, disconnectDB } = require('./src/config/mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')

/**
 * Routes
 */
const register = require('./src/routes/register')
const login = require('./src/routes/login')
const home = require('./src/routes/home')
const blog = require('./src/routes/blog')
const logout = require('./src/routes/logout')
const userAuth = require('./src/middlewares/user-auth')

/**
 * Initial express
 */
const app = express()

/**
 * Setting view engine
 */
app.set('view engine', 'ejs')

/**
 * Set public directory
 */
app.use(express.static(`${__dirname}/public`))

/**
 * parse urlencoded body && json body
 */
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))

/**
 * Instance for session storage
 */
const store = new MongoStore({
  mongoUrl: process.env.CONNECTION_URI,
  collectionName: 'sessions',
  dbName: 'blogapp',
})

/**
 * Initial express session
 */

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: Number(process.env.SESSION_MAX_AGE),
    },
  })
)



/**
 * Routes
 */
app.use('/', home)
app.use('/register', register)
app.use('/login', login)
app.use('/create-blog', blog)
app.use('/logout', logout)

/**
 * User authorization
 */
app.use(userAuth)

/**
 * Start server
 */
const PORT = process.env.PORT || 3000

const server = app.listen(PORT, async () => {
  console.log('Server is running on http://localhost:3000')
  await connectDB(process.env.CONNECTION_URI)
})

server.on('close', async () => await disconnectDB())
