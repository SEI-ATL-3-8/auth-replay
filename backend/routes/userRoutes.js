// grab controller
const userController = require('../controllers/userController');

// express
const express = require('express');
const userRoutes = express.Router();

// routes
userRoutes.post('/', userController.create);
userRoutes.post('/login', userController.login);
userRoutes.get('/profile', userController.getProfile);

module.exports = userRoutes;