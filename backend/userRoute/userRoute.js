const userController = require('../userController/userController')
const express = require('express')
const userRoute = express.Router()

userRoute.post('/', userController.create)

module.exports = userRoute