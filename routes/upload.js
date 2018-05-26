const { Router } = require('express')
const router = Router()
const { TestModel } = require('../models')

router.get('/upload', (req, res) => {
  res.render('upload.html')
})

module.exports = router
