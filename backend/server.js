const express = require('express')
const app = express()

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

// MIDDLEWARE
app.use(express.json())
app.use(require('cors')())

const models = require('./models')
const { user } = models

// ROUTES
const createUser = async (req, res) => {
  try {
    const newUser = await user.create({
      email: req.body.email,
      password: req.body.password
    })
    res.json({
      message: 'ok',
      user: newUser
    })
  } catch (error) {
    next(error)
  }
}

const checkAuth = async (req, res, next) => {
  try {
    const foundUser = await user.findOne({
      where: {email: req.body.email}
    })
    if(foundUser.password === req.body.password) {
      res.json({
        message: 'ok',
        user: foundUser
      })
    }
  } catch (error) {
    next(error)
  }
}

// ROUTES
app.post('/users', createUser)
app.post('/users/login', checkAuth)

const PORT = process.env.port || 3001
app.listen(PORT, () => {
  routesReport.print()
})

