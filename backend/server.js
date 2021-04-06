const express = require('express')
const app = express()

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())
app.use(require('cors')())

const models = require('./models')

const createUser = async (req, res) => {
  try {
    const user = await models.user.create({
      email: req.body.email,
      password: req.body.password
    })

    res.json({ message: 'signup successful', user })
  } catch (error) {
    res.status(400)
    res.json({ error: 'email already taken' })
  }
}
app.post('/users', createUser)

const login = async (req, res) => {
  try {
    const user = await models.user.findOne({
      where: {
        email: req.body.email
      }
    })

    if (user.password === req.body.password) {
      res.json({ message: 'login success', user})
    } else {
      res.status(401).json({ error: 'login failed' })
    }
  } catch (error) {
    res.status(400).json({ error: 'login failed' })
  }
}
app.post('/users/login', login)

const userProfile = async (req, res) => {
  try {
    const user = await models.user.findOne({
      where: {
        id: req.body.userId
      }
    })

    res.json({ user })
  } catch (error) {
    res.status(404).json({ error: 'user profile not found' })
  }
}
app.get('/users/profile', userProfile)


const PORT = process.env.port || 3001
app.listen(PORT, () => {
  routesReport.print()
})

