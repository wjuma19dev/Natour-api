require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

// App setup
const app = express()

// Routes
const tourRoutes = require('./routes/tourRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

// Models
const Tour = require('./models/tour.js')

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(express.json())
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('tiny'))
}

// Static files
app.use(express.static(`${__dirname}/public`))

// Routes
app.use(`${process.env.BASE_URL}/tours`, tourRoutes)
app.use(`${process.env.BASE_URL}/users`, userRoutes)

module.exports = app
