var isAdmin=(req,res,next)=>{
    if(!req.user.isAdmin){
        return res.send({
            isAdmin:req.user.isAdmin
        })
    }
    next();
}

module.exports=isAdmin;