const express = require('express')
const config = require('config')
const app = express()
const nunjucks = require('nunjucks')

nunjucks.configure('templates', {
  autoescape: true,
  express: app
})

const testRoute = require('./routes/test')

app.use('/test', testRoute)

app.listen(config.port, () => console.log(`listening on port ${config.port}`))
