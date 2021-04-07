const express = require('express')
const app = express()

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())
app.use(require('cors')())

const models = require('./models')

const PORT = process.env.port || 3001
app.listen(PORT, () => {
  routesReport.print()
})

const createUser = async(req, res) => {
  try {
    let user = await models.user.create ({
    email: req.body.email,
    password: req.body.password
  })
    res.json({message: 'ok', user})
  } catch (error) {
    res.status(400)
    res.json({error: 'email already taken'})
  }
}
app.post('/users', createUser)

const login = async (req,res) => {
  try {
    const user = await models.user.findOne ({
      where: {
        email: req.body.email
      }
    })

    if (user.password === req.body.password) {
      res.json({message: 'login successful', user: user})
    } else {
      res.status(401)
      res.json ({error: 'login failed, password is incorrect'})
    }
  } catch (error) {
      res.status(400)
      res.json ({error: 'login failed'})
  }
}
app.post('/users/login', login)
