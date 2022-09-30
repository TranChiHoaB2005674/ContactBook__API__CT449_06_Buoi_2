const express = require('express')
const cors = require('cors')

const appError = require('./app/api_error')
const router = require('./app/routes/contact')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/contacts/', router)

app.use((req, res, next) => next(new appError(404, "Resource not found!")))

app.use((error, req, res, next) => 
    res.status(error.statusCode || 500).json({
        message: error.message || 'Internal Server Error',
}))

module.exports = app
