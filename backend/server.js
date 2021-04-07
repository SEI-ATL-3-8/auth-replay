const express = require('express')
const app = express()
const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)
const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(require('cors')())

const PORT = process.env.port || 3001
app.listen(PORT, () => {
  routesReport.print()
})

app.use('/', userRoutes)

