const Payment = require('./model')
const Bank = require('../bank/model')

module.exports = {
  index: async(req,res)=>{
    try {
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')

      const alert = { message: alertMessage, status: alertStatus }

      const payment = await Payment.find();

      res.render('admin/payment/view_payment',{
        title: 'Payment',
        alert,
        payment
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
    }
  },
  viewCreate: async(req,res)=>{
    try {
      const banks = await Bank.find();

      res.render('admin/payment/create',{
        title: 'Create Payment',
        banks
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
    }
  },
  actionCreate: async(req,res)=>{
    try {
      const { type, banks } = req.body

      let payment = await Payment({
        type, banks
      })
      await payment.save();

      req.flash('alertMessage', 'Create Payment successfully')
      req.flash('alertStatus', 'success')

      res.redirect('/payment')
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
    }
  }
}