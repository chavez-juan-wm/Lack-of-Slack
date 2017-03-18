var mongoose = require('mongoose');

// Mongoose's method to create a model/class
var User = mongoose.model('User', {
    email: String,
    pwd: String
});

module.exports = User;