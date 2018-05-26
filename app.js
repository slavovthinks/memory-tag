const express = require('express')
const config = require('config')
const app = express()
const nunjucks = require('nunjucks')

// const testRoute = require('./routes/test')
const uploadRoute = require('./routes/uploadRoute')
const homeRoute = require('./routes/homeRoute');
// var souvenirs = require('./routes/souvenirs');


nunjucks.configure('templates', {
  autoescape: true,
  express: app
})
// JS CSS AND ASSETS
app.use(express.static('static'))

app.use('/', homeRoute)
app.use('/upload', uploadRoute)
app.listen(config.port, () => console.log(`listening on port ${config.port}`))
