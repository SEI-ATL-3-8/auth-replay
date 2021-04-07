const express = require('express')
const app = express()

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())  //allows use of req.body
app.use(require('cors')())

// import models
const models = require('./models')

const PORT = process.env.port || 3001
app.listen(PORT, () => {
  routesReport.print()
})

//controller
const createUser = async (req, res) => {
  try{
    //console.log(req.body)
    let newUser = await models.user.create({
      email: req.body.email,
      password: req.body.password
    })
    res.json({newUser})
  }catch(error){
    console.log(error)
    res.json({error})
  }

}


//route:
app.post('/users', createUser)

//log in

//controller
const login = async (req, res) => {
  try{
    const user = await models.user.findOne({
      where: {
        email: req.body.email
      }
    })
    if(user.password === req.body.password){
      res.json({message: 'login successful', user:user})
    }else{
      res.status(401)
      res.json({error: 'incorrect password'})
    }
  }catch(error){
    res.status(400)
    res.json({error: 'login failed'})
  }
}




//route:
app.post('/users/login', login)

// const getProfile = async (req, res) => {
  
// }


// app.get('/users/profile', getProfile)