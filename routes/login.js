const express = require('express')
const passport = require('passport')
const router = express.Router()
const { signToken } = require('../controller/authController')
const isEmpty = require('lodash/isEmpty')
require('../passport-config')(passport)

router.post('/', (req, res, next) => {
  passport.authenticate('local',
    { session: false, failWithError: true },
    (err, user, info) => {
      if (user === false) {
        console.log('campaign exist')
        return res.json(info)
        // res.end()
      }
      if (err) {
        console.log('campaign does not exist')
        return res.json({ mesage: 'Campaign does not exist' })
        // res.end()
      }
      if (isEmpty(user) === false) {
        console.log(user, 'user:::')
        signIn(user, req, res)
      }
    }
  )(req, res, next)
})

function signIn (user, req, res) {
  // Generate token
  const token = signToken(user, req, res)
  res.cookie('access_token', token, {
    httpOnly: true
  })
  res.status(200).json({ success: true, token: token })
}

module.exports = router
