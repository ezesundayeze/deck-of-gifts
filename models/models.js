const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt')
const saltRounds = 10

const campaignSchema = mongoose.Schema({
  title: String,
  description: String,
  users: [{
    fullName: {
      required: true,
      type: String
    },
    phoneNumber: {
      required: true,
      type: String
    },
    emailAddress: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    password: {
      type: String,
      default: uuidv4()
    },
    status: {
      type: String,
      default: false
    },
    ableToPick: {
      type: String,
      default: false
    }

  }]
})

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  fullName: {
    required: true,
    type: String
  },
  phoneNumber: {
    required: true,
    type: Number
  },
  emailAddress: {
    type: String,
    required: true
  }

})

const deckSchema = mongoose.Schema({
  title: {
    type: String
  },
  address: {
    type: String

  },
  phone: {
    type: String
  }

})

// pagination settings
campaignSchema.plugin(mongoosePaginate)
userSchema.plugin(mongoosePaginate)
module.exports = {
  Campaign: mongoose.model('campaign', campaignSchema),
  User: mongoose.model('user', userSchema),
  Deck: mongoose.model('deck', deckSchema)
}
