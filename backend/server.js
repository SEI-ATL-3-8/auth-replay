// note that IRL, you would add .env to your .gitignore
// it's included here just as a demo
require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

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

    const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

    res.json({ message: 'signup successful', userId: encryptedId })
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
      const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

      res.json({ message: 'login successful', userId: encryptedId })
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
    // get the value out of headers instead of body
    // because that's where the frontend included it

    // now that we encrypted the id before sending it to the client, we need to decrypt it when they send it back
    const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    const user = await models.user.findOne({
      where: {
        // note that decryptedId will be an object like this: { userId: 5 }
        id: decryptedId.userId
      }
    })

    res.json({ user })
  } catch (error) {
    console.log(error)
    res.status(404).json({ error: 'user profile not found' })
  }
}
app.get('/users/profile', userProfile)


const PORT = process.env.port || 3001
app.listen(PORT, () => {
  routesReport.print()
})

