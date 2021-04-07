const express = require('express')
const app = express()

const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())
app.use(require('cors')())

const models = require('./models')

const newUser = async(req, res) => {
    try {
        let user = await models.user.create({

            user: req.body.user,
            password: req.body.password

        })
        res.json({ message: 'welcome new user', user })
    } catch (error) {
        res.json({ error: 'email already used' })

    }
}


const newLogin = async(req, res) => {
    try {
        const login = await models.user.findOne({
            where: { email: req.body.email }
        })
        if (user.password === req.body.password) {
            res.json({ message: 'login success', login })
        } else { res.status(401).json({ error }) }
    } catch (error) {
        res.status(400).json({ error: 'login failed' })
    }
}
app.post('/user/login', newLogin)
app.post('/user', newUser)




const PORT = process.env.port || 3001
app.listen(PORT, () => {
    routesReport.print()
})