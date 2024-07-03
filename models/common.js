const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  state: String,
  country: String,
  city: String,
  street: String,
  houseNumber: Number,
  zip: String,
})

const imageSchema = new mongoose.Schema({
  url: {type:String, default:'user.jpg'},
  alt: String,
})

const nameSchema = new mongoose.Schema({
  first: String,
  middle: String,
  last: String,
})

module.exports = { addressSchema, imageSchema, nameSchema }