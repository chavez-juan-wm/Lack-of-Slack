var mongoose = require('mongoose');

// Mongoose's method to create a model/class
var Message = mongoose.model('Message', {
    msg: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = Message;