const Post = require('../models/Post')

exports.viewCreateScreen = function(req,res){
    console.log(req.session.user)
    res.render('create-post')
}

exports.create = function(req,res){
    // receive data from user input then save to database
    const post = new Post(req.body, req.session.user._id)
    console.log(post)
    post.create().then(function(newId){
        req.flash('success', 'a new post is created')
        res.redirect(`/post/${newId}`)
    }).catch(errors => { 
        errors.forEach(error => {
            req.flash('errors', error)
        })
        req.session.save(() => res.redirect('/create-post'))
    })
}

exports.viewSingle = async function(req,res){

    try{
        const post = await Post.findSingleById(req.params.id, req.visitorId)
        console.log(post)
        res.render('single-post-screen',{post} )
    }catch{
        res.render('404')
    }

}

exports.viewEditScreen = async function(req,res){

    try{
        const post = await Post.findSingleById(req.params.id, req.visitorId)
        console.log(post)
        if(post.isVisitorOwner){
            
            res.render('edit-post', {post})
        }else{
            req.flash('errors', 'You do not have permission to perform that action')
            req.session.save(() => {
                res.redirect(`/post/${post._id}`)
            })
        }
 
    }catch{
        res.render('404')
    }
}

exports.edit = function(req,res){
    res.send('view edit')
}

exports.delete = function(req,res){
    res.send('delete')
}


