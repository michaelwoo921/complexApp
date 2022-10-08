const bcrypt = require('bcryptjs')
const validator = require('validator')
const usersCollection = require('../db').db().collection('users')

function User(data){
    this.data = data,
    this.errors = []

}


// register user
User.prototype.register = function(){
    return new Promise(async (resolve, reject) => {

        try{
            // clean data
            this.cleanUp()

            // validate data
            this.validate()

            if(this.errors.length){
                reject(this.errors)
                return;
            }
            // if no errors then save to database after encrypting password
            const salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data)
            resolve()

        }catch{
            this.errors.push('try again later')
            reject(this.errors)
        }

    })
    
}

User.prototype.login = function(data){
    return new Promise(async (resolve, reject) => {
        if(this.data.username ==''){ 
            this.errors.push('please provide email');
            reject('please provide email')
            return;
        }
        try{
            this.cleanUp()
  
            // login when user exists then have the same password
    
            const attemptedUser = await usersCollection.findOne({username: this.data.username})
            if(attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)){
                resolve('successfully login')
            }else{
                reject('login failed')
            }
        }catch{
            reject('error')
        }

    })
}


User.prototype.validate = function(){
    if(this.data.username ==''){this.errors.push('please provide username')}
    if(!validator.isEmail(this.data.email)){this.errors.push('please provide a valid email')}
    if(!validator.isAlphanumeric(this.data.username)){ this.errors.push('username must consist of alphanumeric characters')}
    if(this.data.password==''){this.errors.push('please provide password')}
    if(this.data.username.length<3){ this.errors.push('username must be at least three characters')}
    if(this.data.username.length>30){ this.errors.push('username cannot be more than 30 characters')}  
    if(this.data.password.length<8){ this.errors.push('password must be at least 8 characters')}
    if(this.data.password.length>50){ this.errors.push('password cannot exceed 50 characters')}  
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
