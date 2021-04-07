const models = require('../models')

const userController = {}

userController.getAllUsers = async (req ,res) => {
    try {
        const user = await models.user.findAll()
        res.json({user})
    } catch (error) {
        res.json({error})
    }
}

userController.createUser = async (req, res) => {
    try {
        const user = await models.user.create({
            email: req.body.email,
            password: req.body.password
        })
        res.json({user})
    } catch (error) {
        res.status(401)
        res.json({error: 'Email in use!'})
    }
}

userController.login = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                email: req.body.email
            }
        })
        if (user.password === req.body.password) {
            res.json({ message: 'Login Successful' , user})
        } else {
            res.status(401)
            res.json({ message: 'User name of password incorrect'})
        }
    } catch (error) {
        res.json(error.message)
    }
}

userController.verify = async (req, res) => {
   try {
        const user = await models.user.findOne({
            where: {
                id: req.body.id
            }
        })
        res.json({user})
    } catch (error) {
        res.json({error: true})
    }
}

module.exports = userController