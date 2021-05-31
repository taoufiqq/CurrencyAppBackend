const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    photo_url: {
        type: String,
        required: true
    },
    sold: {
        type: Number,
        require: true,
        default: 100
    },
    walletSold: {
        type: Number,
        require: true,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)
