const JWT = require('jsonwebtoken')
const { JWT_SECRET } = require('../secret')

module.exports = {
  signToken: (user, req, res) => {
    const { phoneNumber, password } = user
    const { campaignUrl } = req.body
    return JWT.sign({
      iss: 'Eze Sunday Eze',
      campaignUrl: campaignUrl,
      phoneNumber: phoneNumber,
      password: password,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET)
  }
}
