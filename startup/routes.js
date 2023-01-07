const express = require('express')
const users = require('../routes/users')
const genre = require('../routes/genre')
const movies = require('../routes/movies')
const cors = require('cors')

module.exports = function (app) {
    app.use(cors())
    app.use(express.json())
    app.use('/api/users', users)
    app.use('/api/genres', genre)
    app.use('/api/movies', movies)
}