const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: [4, "Too short! Title should be at least 4 characters !"]
    }, 
    description: {
        type: String,
        required: true,
        minLength: [20, "Too short! Description should be at least 20 characters !"]
    
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
        //maxLength: [15, "Too long! Location should be 15 characters !"]
    },
    usersEnrolled :[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    
    // createdAt: {
    //     type: Date, default: Date.now
    // },
}, { timestamps: true })

const Course = mongoose.model('Course', courseSchema)
module.exports = Course