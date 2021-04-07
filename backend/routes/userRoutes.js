const userController = require('../controllers/userController')
const express = require('express')
const userRoutes = express.Router()

userRoutes.get('/', userController.getAllUsers)
userRoutes.post('/user', userController.createUser)
userRoutes.post('/user/login', userController.login)
userRoutes.get('/user/verify', userController.verify)


module.exports = userRoutes