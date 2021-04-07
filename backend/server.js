const express = require('express')
const app = express()

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())
app.use(require('cors')())

const models = require('./models')
const userRoute = require('./userRoute/userRoute')
app.use('/api/user', userRoute)


const login = async (req, res) => {
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
      res.json({error: 'login failed, password incorrect'})
    }

  } catch (error) {
    res.status(400)
    res.json({error: 'login has failed'})
  }
}

app.post('/users/login', login)

const PORT = process.env.port || 3001
app.listen(PORT, () => {
  routesReport.print()
})

