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
        throw Error()
        // get a single post by id  (/post/:id) -> title, body, createdDate, author (objectid)
        // const post = await Post.findSingleById()
        res.render('single-post-screen')
    }catch{
        res.render('404')
    }

}
