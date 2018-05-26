const { Router } = require('express')
const router = Router()
const { TestModel } = require('../models')

router.get('/', (req, res) => {
  res.render('test.html', {test: 'This is a test!', a: 'This is A'})
})

// router.get('/:id', (req, res) => {
//   let souvenir = souvenirsModel.getOne(id)

//   if (souvenir.registered) {
//   	// Play video
//   } else {
//   	// build video
//   }
//   res.render('test.html', {test: 'blqqq!'})
// })
module.exports = router
