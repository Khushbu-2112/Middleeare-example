module.exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.render('msg',{data:req.user, msg: "You are not authorized to view this resource. Do Login"});
    }
}

module.exports.isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.admin){
        next();
    }
    else{
        res.render('msg',{data:req.user, msg: 'You are not an admin to view this resource'});
    }
}