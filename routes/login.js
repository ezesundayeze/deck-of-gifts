const express = require('express')
const passport = require('passport')
const router = express.Router()
const { signToken } = require('../controller/authController')
const isEmpty = require('lodash/isempty')
require('../passport-config')(passport)

router.post('/', (req, res, next) => {
  passport.authenticate('local',
    { session: false, failWithError: true },
    (err, user, info) => {
      if (user === false) {
        res.json({ message: info })
      }
      if (err) {
        res.json({ message: 'Campaign does not exist' })
      }
      if (isEmpty(user) === false) {
        signIn(req, res, next)
      }
    }
  )(req, res, next)
}, signIn)

function signIn (req, res, next) {
  // Generate token
  const token = signToken(req.body)
  res.cookie('access_token', token, {
    httpOnly: true
  })
  res.status(200).json({ success: true, token: token })
}

module.exports = router
