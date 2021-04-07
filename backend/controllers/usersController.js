const models = require('../models')
const usersController = {}

usersController.addUser = async (req, res) => {
    try {
        let user = await models.user.create({
            email: req.body.email,
            password: req.body.password
        })
        res.json({message: 'User Created', user})
    } catch (error) {
        res.status(400)
        res.json({error: 'email already exists'})
    }
}


module.exports = usersController