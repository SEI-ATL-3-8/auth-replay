// grab models
const e = require('express');
const models = require('../models');

// controller obj
const userController = {};

// create user
userController.create = async (req, res) =>
{
    try {
        // create user
        const user = await models.user.create({
            email: req.body.email,
            password: req.body.password
        })
        // return new user
        res.json({message: 'user created successfully', user});
    } catch (error) {
        // status - bad request
        res.status(400);
        res.json({error: 'email already taken'});
    }
}

// login user
userController.login = async (req, res) =>
{
    try {
        // grab user
        const user = await models.user.findOne({ where: { email: req.body.email}});
        // check if input pw matches user's pw
        if (user.password === req.body.password)
        {
            // login message
            res.json({ message: 'login successful', user });
        }
        // incorrect pw
        else
        {
            // status 401 - unauthorized
            res.status(401);
            res.json('incorrect password')
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400);
        res.json({error: 'login failed'});
    }
}

// get user profile
userController.getProfile = async (req, res) =>
{
    try {
        // grab user id
        const userId = req.query.id;
        // check if user id exists
        if (userId)
        {
            // try to grab user with user id
            const user = await models.user.findOne({ where: { id: userId}});
            // check if user with user id exists
            if (user)
            {
                // display user info
                res.json({ user })
            }
            // invalid id
            else
            {
                // status 401 - unauthorized
                res.status(401);
                res.json('unauthorized user id')
            }
        }
        // no user logged in
        else
        {
            // status 400 - bad request
            res.status(400)
            res.json('no user logged in')
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400);
        res.json({error: 'could not get profile'});
    }
}

module.exports = userController;