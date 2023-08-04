const mongoose = require('mongoose')

const User = mongoose.model('User', {
  email: String
})

module.exports = User
