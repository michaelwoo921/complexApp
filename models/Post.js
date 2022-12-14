const User = require('./User');

const postsCollection = require('../db').db().collection('posts')
const ObjectId = require('mongodb').ObjectId

function Post(data, userid){
    this.data = data;
    this.userid = userid;
    this.errors = [];

}



Post.prototype.create = function(){
    return new Promise(async (resolve, reject) => {
        try{
            // clean data
            this.cleanUp()
            // validate data
            this.validate()
            console.log(this)
            // if no validation error then save to db
            if(this.errors.length){
                reject(this.errors)
            }else{
                const info =  await postsCollection.insertOne(this.data)
                resolve(info.insertedId)
            }
        }catch{
            this.errors.push('server error. try again later')
            reject(this.errors)
        }
    })
 
}

Post.prototype.cleanUp = function(){
    if (typeof(this.data.title) != 'string'){ this.data.title = '' }
    if (typeof(this.data.body) != 'string'){ this.data.body = '' }

    this.data = { title: this.data.title.trim(), body: this.data.body.trim(),
        createdDate: new Date(), author: new ObjectId(this.userid)
     }
}

Post.prototype.validate = function(){
    // title and body cannot be blank
    if(this.data.title =='') {  this.errors.push('please provide a title')}
    if(this.data.body =='') {  this.errors.push('please provide body content')}
}

Post.findSingleById = function(id, visitorId){
    return new Promise(async (resolve, reject) => {
        if( typeof(id)!='string' || !ObjectId.isValid(id) ){
            reject()
            return;
        }
        try{
            let posts = await postsCollection.aggregate([
                {$match: {_id: new ObjectId(id)} },
                {$lookup: {from: 'users', localField: 'author', foreignField: '_id', as: 'authorDocument' }},
                {$project: {title: 1, body:1, createdDate: 1, authorId: '$author', 
                    author: {$arrayElemAt: ['$authorDocument', 0]}   }}
            ]).toArray()
            posts = posts.map(post => {
                post.isVisitorOwner = post.authorId.equals(visitorId)
                console.log(visitorId, post.authorId, post.isVisitorOwner)
                post.author = {
                    username: post.author.username,
                    avatar : new User(post.author, true).avatar
                }

                return post
            })
            // console.log(posts)
            if(posts.length){
                resolve(posts[0])
            } else {
                reject()
            }
            
        }catch{
            reject()
        }

    })
}

module.exports = Post