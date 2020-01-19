// const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const { ExtractJwt } = require('passport-jwt')
const bcrypt = require('bcrypt')
const { Campaign } = require('./models/models')

const { JWT_SECRET } = require('./secret')

module.exports = (passport) => {
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: JWT_SECRET
  },

  (payload, done) => {
    const { password, phoneNumber, campaignUrl } = payload
    console.log(campaignUrl, payload)
    Campaign.findOne({ _id: campaignUrl }).then((campaign) => {
      console.log(campaign, 'Campaign')
      campaign.users.find(user => {
        if (user.phoneNumber === phoneNumber & bcrypt.compareSync(password, user.password)) {
          console.log('login')
          return done(null, user)
        } else {
          console.log('sunday', user)
          return done(null, false, { message: 'User does not exist' })
        }
      })
    }).catch((error) => {
      console.log('something')
      return done(error, false)
    })
  })
  )

  passport.use(new LocalStrategy({
    usernameField: 'phoneNumber',
    passwordField: 'password',
    passReqToCallback: true
  },
  (payload, phoneNumber, password, done) => {
    const { campaignUrl } = payload.body
    Campaign.findOne({ _id: campaignUrl }).then((campaign) => {
      campaign.users.find(user => {
        if (user.phoneNumber === phoneNumber & bcrypt.compareSync(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'User does not exist' })
        }
      })
    }).catch((error) => {
      console.log('eze', error)
      return done(error, false)
    })
  }
  ))
}
