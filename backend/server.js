//=============== SETUP ===============//
const express = require('express')
const app = express()

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

const userRoutes = require('./routes/userRoutes');

app.use(express.json())
app.use(express.urlencoded({ extended: false}));
app.use(require('cors')())

const models = require('./models')

//=============== ROUTES ===============//
app.use('/users', userRoutes);


//=============== SERVER ===============//
const PORT = process.env.port || 3001
app.listen(PORT, () => {
  console.log(`backend server on port ${PORT}`);
  routesReport.print()
})

