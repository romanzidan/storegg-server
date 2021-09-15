const Transaction = require('./model')

module.exports = {
  index: async(req,res)=>{
    try {
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')

      const alert = { message: alertMessage, status: alertStatus }

      const transaction = await Transaction.find();

      res.render('admin/transaction/view_transaction',{
        title: 'Transaction',
        alert,
        transaction,
        name: req.session.user.name
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/transaction')
    }
  }
}