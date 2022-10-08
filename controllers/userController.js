const User = require('../models/User')





// register user
exports.register = function(req,res){
    const user = new User(req.body);
    user.register().then(() => {
        req.session.user = {username: user.username}
        req.flash('success','successfully registered')
        req.session.save(function(){res.redirect('/')})
    }).catch(function(errors){
        errors.forEach(error => req.flash('errors', error))
        req.session.save(function(){
            res.redirect('/')
        })
        
    })
}

exports.login = function(req,res){
    const user = new User(req.body);
    user.login().then(function(){ 
        req.session.user ={ username: user.username}
        req.flash('success', 'login successfully')
        req.session.save(function(){
            res.redirect('/')
        })
    }).catch(function(errors){ 
        errors.forEach(error => req.flash('errors', error))
        req.session.save(function(){
            res.redirect('/')
        })
    })
}

exports.home = function(req,res){
    if(req.session.user){
        res.send('home-dashboard')
    }else{
        res.render('home-guest')
    }
    
}