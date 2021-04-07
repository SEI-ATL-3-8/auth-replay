const models = require('../models')
const user = require('../models/user')
const userController = {}

userController.create = async (req, res) => {
    console.log(req.body)
    try {
        const user = await models.user.create({
            email: req.body.email,
            password: req.body.password,
        })
        res.json({message: 'ok', user })
    } catch (error) {
        res.status(400)
        res.json({error: 'email already taken'})
    }
}

userController.getAll = async (req, res) => {
    try {
        let users = await models.user.findAll()

        res.json({users})
    } catch (error) {
        res.json({error})
    }
}

userController.find = async (req, res) => {
    try {
        let user = await models.user.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json({user})
    } catch (error) {
        res.json({error})
    }
}

module.exports = userController