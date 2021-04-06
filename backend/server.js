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