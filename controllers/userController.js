const User = require('../models/User')





// register user
exports.register = function(req,res){
    const user = new User(req.body);
    user.register().then(() => res.send('success')).catch(function(errors){
        res.send(errors)
    })
}

exports.home = function(req,res){
    res.render('home-guest')
}