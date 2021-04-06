const express = require('express')
const userRoutes = express.Router()
const userControllers = require('../controllers/userControllers')

userRoutes.post('/', userControllers.createUser)
userRoutes.post('/login', userControllers.login)




module.exports = userRoutes