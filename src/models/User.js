const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        match: /^[A-Za-z0-9]*$/,
        required: true,
        minLength: 5
    },
    password : {
        type: String,
        match: /^[A-Za-z0-9]*$/,
        required: true,
        minLength: [5, 'Password too short!']
    }
 })

 userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
           .then(hash => {
            this.password = hash

            next()
           })
 })

 userSchema.method('validatePassword', function(password){
    return bcrypt.compare(password, this.password) //this.password is the encrypted password. Password is the password that the user is giving
    
})

 const User = mongoose.model('User', userSchema)
 module.exports = User