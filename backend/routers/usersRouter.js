const usersController = require('../controllers/usersController')
const express = require('express')
const usersRoute = express.Router()

usersRoute.post('/', usersController.addUser)

module.exports = usersRoute