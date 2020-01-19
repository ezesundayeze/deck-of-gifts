const express = require('express')
const { Campaign } = require('../models/models')
const bcrypt = require('bcrypt')
const saltRounds = 10
const router = express.Router()
const uuidv4 = require('uuid/v4')
const { emailContent, transport } = require('../emailConfig')
const password = uuidv4()
const passport = require('passport')

/*
* Get all campaigns
*/
router.get('/', (req, res) => {
  const options = {
    offset: 1,
    limit: 10
  }
  Campaign.paginate({}, options).then((result) => {
    res.json(result)
  })
})
  .post('/', (req, res) => {
    const cleanedUsers = req.body.users.map((user) => {
      const hash = bcrypt.hashSync(password, saltRounds)
      user.password = hash

      return user
    })
    const campaign = new Campaign(
      {
        title: req.body.title,
        users: cleanedUsers
      }
    )
    campaign.save()
      .then((data) => {
        data.users.forEach(user => {
          transport.sendMail(emailContent('mailstoeze@gmail.com', user.emailAddress, 'Welcome Email', `Hi ${user.fullName}, 
          <p>Your username is:  ${user.phoneNumber}</p> 
          <p>Password is: ${password} </p> 
          </b> Login to your to view your campaign here: <a href="http://localhost:3000/login/${data._id}">http://localhost:3000/login/${data._id}</a> 
          `), function (err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info)
            }
          })
        })
        res.json({ message: 'Campaign creatd successfully' })
      }).catch((err) => {
        res.json({ message: err })
      })
  })

  .delete('/', (req, res) => {
    res.json({ message: 'delete a deck' })
  })

  .patch('/', (req, res, next) => {
    res.json({ message: 'update deck' })
  }).get('/:id', (req, res, next) => {
    passport.authenticate('jwt', (req, user, next) => {
      Campaign.findOne({ _id: req.campaignUrl }).then((campaign) => {
        console.log('eze:::', campaign, req)
        return res.json(campaign)
      }).catch((err) => {
        console.log('eze:::?')
        return res.send(err)
      })
    }, { session: false })(req, res, next)
  })

module.exports = router
