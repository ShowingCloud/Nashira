const mongoose = require('mongoose');

module.exports = mongoose.model('Account', new mongoose.Schema({
  email: String,
  emailVerified: Boolean,
  mobile: String,
  mobileVerified: Boolean,
  name: String,
  nickname: String,
  birthdate: Date,
  addresses: [{
    country: String,
    locality: String,
    postal: String,
    region: String,
    streetAddress: String,
  }],
  firstName: String,
  middleName: String,
  lastName: String,
  picture: String,
  preferredUsername: String,
  profile: String,
  website: String,
  zoneinfo: String,
}, {
  timestamps: true,
}));
