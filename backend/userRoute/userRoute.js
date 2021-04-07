const userController = require('../userController/userController')
const express = require('express')
const userRoute = express.Router()

userRoute.post('/', userController.create)
userRoute.get('/', userController.getAll)
userRoute.get('/:id', userController.find)

module.exports = userRoute