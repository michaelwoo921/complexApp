const User = require('../models/User')





// register user
exports.register = function(req,res){
    const user = new User(req.body, true);
    user.register().then(() => {
        req.session.user = {username: user.data.username, avatar: user.avatar, _id: user.data._id}
        req.flash('success','successfully registered')
        req.session.save(function(){res.redirect('/')})
    }).catch(function(regErrors){
        
        regErrors.forEach(error => req.flash('regErrors', error))
        req.session.save(function(){
            
            res.redirect('/')
        })
    })
}

exports.login = function(req,res){
    const user = new User(req.body);
    user.login().then(function(){ 
        req.session.user ={ username: user.data.username, avatar: user.avatar, _id: user.data._id}
        req.flash('success', 'logged in successfully')
        req.session.save(function(){
            res.redirect('/')
        })
    }).catch(function(error){ 
        req.flash('errors', error)
        req.session.save(function(){
            res.redirect('/')
        })
    })
}

exports.logout = function(req,res){
    req.session.destroy(function(){
        res.redirect('/')
    })
}

exports.home = function(req,res){
    if(req.session.user){
        res.render('home-dashboard')
    }else{
        res.render('home-guest', {regErrors: req.flash('regErrors')})
    }
    
}


exports.mustBeLoggedIn = function(req,res,next){
    if(req.session.user){
        next()
    } else {
        req.flash('errors', 'You must be logged in to perform that action')
        req.session.save(() => res.redirect('/'))
    }
}