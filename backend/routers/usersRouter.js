const usersController = require('../controllers/usersController')
const express = require('express')
const usersRoute = express.Router()

usersRoute.post('/', usersController.addUser)
usersRoute.post('/login', usersController.login)

module.exports = usersRoute