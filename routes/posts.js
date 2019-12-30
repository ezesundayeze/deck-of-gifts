const express = require('express')
const router = express.Router()
const Post = require('../models/post')

router.get('/', (req, res) => {
  Post.find().then((data) => (
    res.json(data)
  ))
}
)

router.post('/create', (req, res, next) => {
  console.log(req.body)
  const post = new Post(
    {
      title: req.body.title,
      description: req.body.description
    }
  )

  post.save()
    .then((result) => {
      res.json(result)
    }).catch((err) => {
      console.error(err)
    })
})

router.get('/delete', (req, res) => {
  res.send('Delete campaign')
})

router.get('/update/:id', (req, res) => {
  res.send(`update campaign with id: ${req.params.id} `)
})

module.exports = router
