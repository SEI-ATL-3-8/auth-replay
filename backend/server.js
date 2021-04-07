const express = require('express')
const app = express()
const PORT = process.env.port || 3001
const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)
const usersRoute = require('./routers/usersRouter')
app.use(express.json())
app.use(require('cors')())

app.use('/users', usersRoute)


app.listen(PORT, () => {
  routesReport.print()
})

