const User = require('../models/User')

exports.register = function(req,res){
    const user = new User(req.body);
    user.register()
    res.send('register route')
}

exports.home = function(req,res){
    res.render('home-guest')
}