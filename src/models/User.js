const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: [ /^[A-Za-z0-9]*$/, "Username should be only english letters and digits"],
        minLength: [5, "Username should be at least 3 characters long!"]
    },
    password : {
        type: String,
        required: true,
        match: [ /^[A-Za-z0-9]*$/, "Password should be only english letters and digits!"],
        minLength: [5, 'Password too short! Password should be at least 5 characters long!']
    },
    enrolledCourses:[{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
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