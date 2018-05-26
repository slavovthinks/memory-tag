const express = require('express')
const config = require('config')
const app = express()
const nunjucks = require('nunjucks')

nunjucks.configure('templates', {
  autoescape: true,
  express: app
})

const testRoute = require('./routes/test')

app.use('/souvenirs', testRoute)
app.get('/', (req, res) => res.send(
    'Hello World! EDITED' +
    '<a href="/page">link test</a>'
))
app.get('/page', (req, res) => res.send(
    '<a href="/">Go to homepage</a>'
))
app.listen(config.port, () => console.log(`listening on port ${config.port}`))
