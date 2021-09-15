const Transaction = require('../transaction/model')
const Voucher = require('../voucher/model')
const Player = require('../player/model')
const Category = require('../category/model')

module.exports = {
	index: async (req, res) => {
		try {
			const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')

      const alert = { message: alertMessage, status: alertStatus }
      
			const transaction = await Transaction.countDocuments();
			const voucher = await Voucher.countDocuments();
			const player = await Player.countDocuments();
			const category = await Category.countDocuments();

			res.render('admin/dashboard/view_dashboard', {
				title: 'Dashboard',
				name: req.session.user.name,
				alert,
				count: {
					transaction,
					player,
					voucher,
					category
				}
			})
		} catch (err) {
			req.flash('alertMessage', `${err.message}`)
			req.flash('alertStatus', 'danger')
			res.redirect('/dashboard')
		}
	}
}