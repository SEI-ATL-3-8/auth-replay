const express = require('express')
const userRoutes = express.Router()
const userControllers = require('../controllers/userControllers')

userRoutes.post('/', userControllers.createUser)
userRoutes.post('/login', userControllers.login)
userRoutes.get('/profile', userControllers.getProfile)
userRoutes.get('/verify', userControllers.verify)




module.exports = userRoutes