const User = require('../models/User.js')
const jwt = require('../lib/jsonwebtoken.js')
const config = require('../configurations/configPorts')

exports.getUserByUsername =  (username) => User.findOne({username})

exports.register = async (username, plainPassword) => {
   const newUser = User.create({username, password: plainPassword})
   const payLoad = {_id:newUser._id, username: newUser.username}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token

} 

exports.login = async (username, password) => {
    const existingUser = await this.getUserByUsername(username)

    const isValid = await existingUser.validatePassword(password)

    if(!existingUser || !isValid){ //we call the modell method
      throw "Invalid username or password!"
   }

   const payLoad = {_id:existingUser._id, username: existingUser.username}
   const token = await jwt.sign(payLoad, config.SECRET, {expiresIn: '2h'})

   return token
}
