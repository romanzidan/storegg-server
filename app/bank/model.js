const mongoose = require('mongoose')

let bankSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  bankName: {
    type: String,
    required: [true, 'Bank name is required']
  },
  noRekening: {
    type: String,
    required: [true, 'No Rekening is required']
  }
}, {timestamps: true})

module.exports = mongoose.model('Bank', bankSchema)