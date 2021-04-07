// note that IRL, you would add .env to your .gitignore
// it's included here just as a demo
require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())
app.use(require('cors')())

const lookupUser = async (req, res, next) => {
  try {
    // now that we are looking up the user on every request, some requests (ie login and signup) won't have an authorization header
    // and for those we shouldn't attempt to decrypt it
    if (req.headers.authorization) {
      // this user lookup used to happen inside the profile route
      // but irl, we want to look up our user for many many routes
      // so we're doing it in a piece of middleware that runs before every route
      
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
  
      // now every downstream request can access the user we looked up via req.user
      req.user = user
    } else {
      req.user = null
    }

    // if you don't call next, express will freeze. next lets it continue the waterfall
    next()
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}
// app.use tells express to run the lookupUser function before every route
app.use(lookupUser)

const models = require('./models')

const createUser = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    const user = await models.user.create({
      email: req.body.email,
      password: hashedPassword
    })

    const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

    res.json({ message: 'signup successful', userId: encryptedId })
  } catch (error) {
    console.log(error)
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

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

      res.json({ message: 'login successful', userId: encryptedId })
    } else {
      res.status(401).json({ error: 'login failed' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'login failed' })
  }
}
app.post('/users/login', login)

const userProfile = async (req, res) => {  
  try {
    // now that the user is being looked up in the middleware, there's no need to look it up here
    // it's just available in req.user
    // though we should still check if it's null or not
    const user = req.user
    if (user) {
      res.json({ message: 'user profile found successfully', user })
    } else {
      res.status(404).json({ error: 'user profile not found' })
    }
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

