const express = require('express')
const app = express()

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

const PORT = process.env.port || 3001
const userRoutes = require('./routes/userRoutes')



app.use(express.json())
app.use(require('cors')())

app.use('/users', userRoutes)

app.listen(PORT, () => {
  routesReport.print()
})

