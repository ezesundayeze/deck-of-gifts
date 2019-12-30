const crypto = require('crypto')
const hash = crypto.createHash('sha256').digest('hex')

module.exports = {
  JWT_SECRET: hash
}
