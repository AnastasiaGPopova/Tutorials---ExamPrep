const mongoose = require('mongoose')

const asseccorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\//, "Invalid URL"]
    },
    description: {
        type: String,
        required: true,
        maxLength: 50
    }
})

const Asseccory = mongoose.model('Accessory', asseccorySchema)

module.exports = Asseccory