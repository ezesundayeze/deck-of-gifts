const express = require('express')
const router = express.Router()
const { User } = require('../models/models')

router.get('/', (req, res) => {
  const options = {
    offset: 1,
    limit: 10
  }
  User.paginate({}, options).then((result) => {
    res.json(result)
  })
})
  .post('/', (req, res) => {
    res.json({ message: 'create a user' })
  })

  .delete('/', (req, res) => {
    res.json({ message: 'delete a user' })
  })

  .patch('/', (req, res) => {
    res.json({ message: 'update user' })
  })

module.exports = router
