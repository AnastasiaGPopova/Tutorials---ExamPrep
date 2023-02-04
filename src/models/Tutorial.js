const mongoose = require('mongoose')

const tutorialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 50, //check real length
    },
    imageUrl: {
        type: String,
        required: true,
        // match: /^https?:\/\//
        validate : {
            validator: function (value){
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "Invalid URL!"
        }

    }, 
    duration: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date, default: Date.now
    },
    owner: {
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },
    usersEnrolled:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
})

const Tutorial = mongoose.model('Tutorial', tutorialSchema)
module.exports = Tutorial