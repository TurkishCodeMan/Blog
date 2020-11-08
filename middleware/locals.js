module.exports = (req, res, next) => {
    if(!req.session.isAuthenticated){
        return res.send({
            isUser:req.user,
            isAuthenticated:false,
        });
    }else{
        return res.send({
            isUser:req.user,
            isAuthenticated:true,
        });
    }
    next();
}//Burası sadece aktif oturumu verir