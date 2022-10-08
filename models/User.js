const bcrypt = require('bcryptjs')
const usersCollection = require('../db').db().collection('users')

function User(data){
    this.data = data,
    this.errors = []

}


// register user
User.prototype.register = function(callback){
    // clean data
    this.cleanUp()

    // validate data
    this.validate()

    if(this.errors.length){
        callback(this.errors)
        return;
    }

    // if no errors then save to database after encrypting password
    // const salt = bcrypt.genSaltSync(10)
    // this.data.password = bcrypt.hashSync(this.data.password, salt)
    // usersCollection.insertOne(this.data)
    callback('successfully registered user')
    
}

User.prototype.validate = function(){
    if(this.data.username ==''){this.errors.push('please provide username')}
    if(this.data.email ==''){this.errors.push('please provide email')}
    if(this.data.password==''){this.errors.push('please provide password')}
}

User.prototype.cleanUp = function(){
    if(typeof(this.data.username) !='string'){
        this.data.username = ''
    }
    if(typeof(this.data.email) !='string'){
        this.data.email = ''
    }
    if(typeof(this.data.password) !='string'){
        this.data.password = ''
    }
    // remove bogus data
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }

}

module.exports = User;
