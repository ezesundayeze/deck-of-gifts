const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../secret')

module.exports = {
  signToken: user => {
    const { phoneNumber, campaignUrl } = user
    return JWT.sign({
      iss: 'Eze Sunday Eze',
      campaignUrl: campaignUrl,
      phoneNumber: phoneNumber,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET)
  }
}
