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

module.exports = userController