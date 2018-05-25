const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.render('test.html', {test: 'This is a test!'})
})

module.exports = router
