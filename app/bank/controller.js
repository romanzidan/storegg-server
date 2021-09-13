const Bank = require('./model')

module.exports = {
  index: async(req,res)=>{
    try {
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')

      const alert = {message: alertMessage, status: alertStatus}
      const bank = await Bank.find()

      res.render('admin/bank/view_bank',{
        title: 'Bank',
        alert,
        bank
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  },
  viewCreate: async(req,res)=>{
    try {
      res.render('admin/bank/create',{
        title: 'Create Bank'
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  },
  actionCreate: async(req,res)=>{
    try {
      const {name, nameBank, noRekening} = req.body

      let bank = await Bank({
        name, nameBank, noRekening
      })
      await bank.save();

      req.flash('alertMessage', 'Create bank successfully')
      req.flash('alertStatus', 'success')

      res.redirect('/bank')
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  }
}