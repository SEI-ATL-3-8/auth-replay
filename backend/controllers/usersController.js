const models = require('../models')
const usersController = {}

usersController.addUser = async (req, res) => {
    try {
        let user = await models.user.create({
            email: req.body.email,
            password: req.body.password
        })
        res.json({ message: 'User Created', user })
    } catch (error) {
        res.status(400)
        res.json({ error: 'email already exists' })
    }
}
usersController.login = async (req, res) => {
    try {
        let user = await models.user.findOne({
            where: {
                email: req.body.email
            }
        })
        if (user.password = req.body.password) {
            res.json({ message: "welcome back", user: user })
        }
        else {
            res.status(401)
            res.json({ error: 'login failed' })
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        res.json({ error: 'login failed' })
    }
}

module.exports = usersController