module.exports={
    index: async(req,res)=>{
        try {
            res.render('index', {
                title: 'Express'
            })
        } catch (err) {
            console.log(err)
        }
    }
}