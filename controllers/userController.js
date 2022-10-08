const User = require('../models/User')





// register user
exports.register = function(req,res){
    const user = new User(req.body);
    user.register(function(result){
        res.send(result)
    })
}

exports.home = function(req,res){
    res.render('home-guest')
}