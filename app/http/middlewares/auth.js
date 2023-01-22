//for protected routes

function auth(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/login')
}

module.exports=auth