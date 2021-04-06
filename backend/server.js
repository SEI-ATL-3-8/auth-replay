const express = require('express')
const app = express()

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())
app.use(require('cors')())

const models = require('./models')

const createUser = async (req,res) => {
  try {
    console.log(req.body)
    const user = await models.user.create({
      email: req.body.email,
      password: req.body.password
    })
    console.log(user)
    res.json({ message: 'okidokey', user })
  } catch (error) {
    res.status(400)
    res.json({ error: 'email already taken'})
  }
}
app.post('/users', createUser)

const login = async (req,res) => {
  try {
    const user = await models.user.findOne({
      where: {
        email: req.body.email
      }
    })

    console.log(user)

    if (user.password === req.body.password) {
      res.json({ message: 'login successful', user: user})
    } else {
      res.status(401)
      res.json({ error: 'login failed'})
    }
    console.log(user.password)
    console.log(req.body.password)
  } catch (error) {
    res.status(400)
      res.json({ error: 'login failed'})
  }
}
app.post('/users/login', login)


// const lookEmUp = 


const PORT = process.env.port || 3001
app.listen(PORT, () => {
  routesReport.print()
})

