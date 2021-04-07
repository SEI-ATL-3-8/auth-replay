const models = require('../models')

const userControllers = {}

userControllers.createUser = async (req, res) => {
    try {
        const user = await models.user.create({
            email: req.body.email,
            password: req.body.password
        })

        res.json({
            message: 'User created',
            user
        })
    } catch (error) {
        res.status(400)
        res.json({error: 'Email already taken'})
    }
}

userControllers.login = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                email: req.body.email
            }
        })
        if ( user.password === req.body.password ) {
            res.json({
                message: 'Login successful',
                user: user
            })
        } else {
            res.status(401)
            res.json({error: 'Login failed'})
        }
    } catch (error) {
        res.status(400)
        res.json({error: 'Login failed'})
    }
}

userControllers.getProfile = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        res.json({user})
    } catch (error) {
        res.status(404)
        res.json({error: 'User not found'})
    }
}

module.exports = userControllers