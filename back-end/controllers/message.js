// The message model
var Message = require('../models/Message');

module.exports = {
    // Get the messages from the database
    get: function (req, res){
        Message.find({}).populate('user', '-pwd').exec(function(err, data){
            res.send(data);
        });
    },
    post: function(req, res){
        console.log(req.body + "\nUser: " + req.user);

        req.body.user = req.user;
        // Create a Message object and insert a new message through req.body, then save it
        var message = new Message(req.body);
        message.save();
        res.status(200);
    }
};