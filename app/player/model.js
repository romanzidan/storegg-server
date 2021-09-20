const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const HASH_ROUND = 10

let playerSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength :[225, "Name max length 225"],
    minlength :[3, "Name min length 3"]
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    maxlength :[225, "Username max length 225"],
    minlength :[3, "Username min length 3"]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength :[225, "Password max length 225"],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  status:{
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone Number is Required'],
    maxlength :[13, "Phone Number max length 13"],
    minlength :[9, "Phone Number min length 9"]
  },
  avatar: {
    type: String
  },
  fileName: {
    type: String
  },
  favorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
}, {timestamps: true})

playerSchema.path('email').validate(async function (value){
  try {
    const count = await this.model('Player').countDocuments({ email: value })
    return !count;
  } catch (err) {
    throw err
  }
}, attr => `${attr.value} Sudah terdaftar`)

//fungsi sebelum disave perlu hash password
playerSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, HASH_ROUND)
  next()
})

module.exports = mongoose.model('Player', playerSchema)