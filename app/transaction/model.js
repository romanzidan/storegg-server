const mongoose = require('mongoose')

let transactionSchema = mongoose.Schema({
  historyVoucherTopup: {
    gameName: {type: String, required: [true, 'Game Name is required']},
    category: {type: String, required: [true, 'Category is required']},
    thumbnail: {type: String},
    coinName: {type: String, required: [true, 'Coin Name is required']},
    coinQuantity: {type: String,required: [true, 'Coin Quantity is required']},
    price: {type: Number}
  },

  historyPayment: {
    name: {type: String, required: [true, 'Name is required']},
    type: {type: String, required: [true, 'Type is required']},
    bankName: {type: String, required: [true, 'Bank name is required']},
    noRekening: {type: String, required: [true, 'No Rekening is required']},
  },

  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength :[225, "Name max length 3 - 225 "],
    minlength :[3, "Name min length 3 - 225 "]
  },

  accountUser: {
    type: String,
    required: [true, 'Account name is required'],
    maxlength :[225, "Account Name max length 3 - 225 "],
    minlength :[3, "Account Name min length 3 - 225 "]
  },

  tax: {
    type: Number,
    default: 0
  },

  value: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },

  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },

  historyUser: {
    name: {type: String, required: [true, 'Name is required']},
    phoneNumber: {
      type: String, 
      required: [true, 'Phone Number is required'],
      maxlength :[13, "Phone Number max length 9 - 13 "],
      minlength :[9, "Name min length 9 - 13 "]
    }
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, {timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)