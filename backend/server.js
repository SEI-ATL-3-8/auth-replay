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


const createUser = async (req,res) => {
  try {
    const newUser = await models.user.create({
      email: req.body.email,
      password: req.body.password
    })
    console.log(newUser);
    res.json({message: 'You got it girl, heres your new user', newUser})
  } catch (error) {
    res.status(400)
    res.json({error: 'You used that email already, silly.'})
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
      if(user.password === req.body.password){
        res.json({message: 'login successful', user: user})
      }else{
        res.status(401)
        res.json({error: 'login failed'})
      }
    } catch (error) {
       res.status(400)
       res.json({error: 'login failed'})
    }
  }

  app.post('/users/login', login)

  const userProfile = async (req, res) => {  
    try {
      console.log(req.headers)
      const user = await models.user.findOne({
        where: {
          id: req.headers.authorization
        }
      })
  
      res.json({ user })
    } catch (error) {
      res.status(404).json({ error: 'user profile not found' })
    }
  }
  app.get('/users/profile', userProfile)
  