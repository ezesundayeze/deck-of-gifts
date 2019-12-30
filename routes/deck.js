const express = require('express')
const router = express.Router()
const { Deck } = require('../models/models')

router.get('/', (req, res) => {
  const options = {
    offset: 1,
    limit: 10
  }
  Deck.paginate({}, options).then((result) => {
    res.json(result)
  })
})
  .post('/', (req, res) => {
    res.json({ message: 'create a deck' })
  })

  .delete('/', (req, res) => {
    res.json({ message: 'delete a deck' })
  })

  .patch('/', (req, res) => {
    res.json({ message: 'update deck' })
  })

module.exports = router
