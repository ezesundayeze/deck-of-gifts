// const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const { ExtractJwt } = require('passport-jwt')
const bcrypt = require('bcrypt')
const { Campaign } = require('./models/models')
const jwt = require('jsonwebtoken')

const JWT_SECRET = '89723947jhdfhfkjwehfe3nbjhi'

module.exports = (passport) => {
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('authorization'),
    secretOrKey: JWT_SECRET
  },

  (payload, done) => {
    Campaign.findOne({ _id: payload.campaign }).then((campaign) => {
      campaign.users.find(user => {
        if (user.phoneNumber === payload.phoneNumber) {
          return user
        }
        if (bcrypt.compareSync(payload.password, user.password)) {
          const accessToken = jwt.sign({ phoneNumber: user.phoneNumber }, JWT_SECRET, {
            expiresIn: 86400
          })

          done(null, accessToken)
        }
      })
    }).catch((error) => {
      done(error, false)
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
          done(null, user)
          // }
        } else {
          done(null, false, { message: 'User does not exist' })
        }
      })
    }).catch((error) => {
      done(error, false, { message: 'Campaign does not exist' })
    })
  }
  ))
}
