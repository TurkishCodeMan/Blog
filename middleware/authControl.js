var authControl=(req,res,next)=>{
    console.log(req.session.isAuthenticated)
    if(!req.session.isAuthenticated){
       return res.send({
            isAuthenticated:false,
        })
    }
    next();
}

module.exports =authControl;