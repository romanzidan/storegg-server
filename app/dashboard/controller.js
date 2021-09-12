module.exports={
    index: async(req,res)=>{
        try {
            res.render('index',{
                title: 'Dashboard'
            })
        } catch (err) {
            console.log(err)
        }
    }
}