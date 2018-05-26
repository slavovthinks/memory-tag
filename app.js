const express = require('express')
const config = require('config')
const app = express()
const nunjucks = require('nunjucks')

const testRoute = require('./routes/test')
const uploadRoute = require('./routes/upload')

nunjucks.configure('templates', {
  autoescape: true,
  express: app
})
app.use(express.static('static'))

app.use('/souvenirs', testRoute)
app.get('/upload', uploadRoute)
app.listen(config.port, () => console.log(`listening on port ${config.port}`))
