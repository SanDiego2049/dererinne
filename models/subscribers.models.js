const mongoose =require('mongoose');


subscriberSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }

}, {timestamps: true})

module.exports = mongoose.model('Subscriber', subscriberSchema);
