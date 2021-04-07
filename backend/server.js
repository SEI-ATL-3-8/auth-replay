require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)
const PORT = process.env.port || 3001

app.use(express.json())
app.use(require('cors')())

const models = require('./models')


const lookupUser = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
      const user = await models.user.findOne({
        where: {
          // note that decryptedId will be an object like this: { userId: 5 }
          id: decryptedId.userId
        }
      })

      req.user = user
    } else {
      req.user = null
    }

  } catch (error) {
    console.log(error)
  } finally {
    // code in the finally block runs whether there was an error or not
    // next tells express to continue on with the waterfall; without it the request would hang here forever
    next()
  }
}


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
    res.status(400)
    res.json({ error: 'email already taken' })
  }
}

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
const userProfile = async (req, res) => {
  try {
    // we used to look up user in here
    // but now it's looked up before all routes and attached to req
    // so there's no need to look it up in here
    // furthermore, we could access req.user in any route
    // this is useful because irl, we have many many routes that want to access the currently logged in user, not just 1

    res.json({ user: req.user })
  } catch (error) {
    console.log(error)
    res.status(404).json({ error: 'user profile not found' })
  }
}

// app.use runs this function before every request, no matter its verb and path
app.use(lookupUser)
app.post('/users', createUser)
app.post('/users/login', login)
app.get('/users/profile', userProfile)

app.listen(PORT, () => {
  routesReport.print()
})

