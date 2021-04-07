const usersController = require('../controllers/usersController')
const express = require('express')
const usersRoute = express.Router()

usersRoute.post('/', usersController.addUser)
usersRoute.post('/login', usersController.login)
usersRoute.get('/profile', usersController.getProfile)

module.exports = usersRoute