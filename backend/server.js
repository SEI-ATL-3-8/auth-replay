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

//Chapter 2
const login = async (req,res) => {
  try {
    const user = await models.user.findOne({
      where:{
        email: req.body.email//look up user by email
      }
    })
    // console.log(user)
    //check if passwords match
    if(user.password === req.body.password){
      res.json({message: 'login successful', user: user})//if passwords match, respond w/ user obj
    }else {
      res.status(401) //if password not match, 401
      res.json({error: 'incorrect password'})
    }

  } catch (error) {
    res.status(400)
    res.json({error:'login failed'})
  }
}
app.post('/users/login', login) //POST /users/login






const PORT = process.env.port || 3001
app.listen(PORT, () => {
  routesReport.print()
})

