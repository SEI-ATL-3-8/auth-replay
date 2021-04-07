const express = require('express')
const app = express()

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())
app.use(require('cors')())

const models = require('./models')

//chapter 1
const createUser = async (req, res) => {
  try {
    // console.log(req.body)
    const user = await models.user.create({
      email: req.body.email,
      password: req.body.password
    })
    // console.log(user)
    res.json({message: 'New user created', user})
  } catch (error) {
    res.status(400)
    res.json({error: 'email already taken!'})
  }
}
app.post('/users', createUser)









const PORT = process.env.port || 3001
app.listen(PORT, () => {
  routesReport.print()
})

