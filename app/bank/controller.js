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
        bank,
        name: req.session.user.name
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
        title: 'Create Bank',
        name: req.session.user.name
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
        name, nameBank, noRekening,
        name: req.session.user.name
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
  },
  viewEdit: async(req,res)=>{
    try {
      const { id } = req.params
      
      const bank = await Bank.findOne({_id: id})

      res.render('admin/bank/edit',{
        title: 'Edit Bank',
        bank,
        name: req.session.user.name
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  },
  actionEdit: async(req,res)=>{
    try {
      const { id } = req.params
      const {name, nameBank, noRekening} = req.body

      await Bank.findOneAndUpdate({
        _id: id
      },{
        name, nameBank, noRekening
      })

      req.flash('alertMessage', 'Update bank successfully')
      req.flash('alertStatus', 'success')

      res.redirect('/bank')
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  },
  actionDelete: async(req,res)=>{
    try {
      const { id } = req.params

      await Bank.findOneAndDelete({
        _id: id
      })

      req.flash('alertMessage', 'Delete bank successfully')
      req.flash('alertStatus', 'success')

      res.redirect('/bank')
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  }
}