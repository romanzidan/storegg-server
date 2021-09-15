module.exports={
    index: async(req,res)=>{
        try {
            res.render('index',{
                title: 'Dashboard',
                name: req.session.user.name
            })
        } catch (err) {
            console.log(err)
        }
    }
}