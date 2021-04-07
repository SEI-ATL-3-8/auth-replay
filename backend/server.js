const express = require('express')
const app = express()

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

let loginState = 0

app.use(express.json())
app.use(require('cors')())

const models = require('./models')

const createUser = async (req, res) => {
  try {
    console.log(req.body)
    const user = await models.user.create({
      email: req.body.email,
      password: req.body.password
    })
    console.log(user)

    res.json({ message: 'ok', user})
  } catch (error) {
    res.status(400)
    res.json({error: 'email already taken'})
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
    console.log(user)
    console.log(req.body.email)
    console.log(req.body.password)

  if (user.password === req.body.password) {
    res.json({ message: 'login successful', user: user})
  } else {
    res.status(401)
    res.json({ error: 'login failed'})
  }
  } catch (error) {
    res.status(400)
    res.json({ error: 'login failed'})

  }
}

const getProfile = async (req, res) => {
  try {
    
    const user = await models.user.findOne({
      where: {
        id: req.body.id
      }
    })
    if (user.id === req.body.id) {
    res.json({ message: 'user found', user: user})
  } else if (user.id === null) {
    res.status(401)
    res.json({error: 'No user found'})
  }
  } catch (error) {
    res.status(400)
    res.json({error: 'No user found'})
  }
}

app.get('/users/profile', getProfile)
app.post('/users/login', login)

const PORT = process.env.port || 3001
app.listen(PORT, () => {
  routesReport.print()
})

