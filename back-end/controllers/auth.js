var User = require('../models/User');
var jwt = require('jwt-simple');
var moment = require('moment');


module.exports = {
    register: function(req, res) {
        // Checks if the email the user put has already been taken
        User.findOne({email: req.body.email}).exec(function(err, existingUser){
            if(existingUser){
                return res.status(409).send({message: "That email has already been registered."});
            }

            // Create a User object and insert a new user through req.body, then save it
            var user = new User(req.body);

            // Overload the save method to our own custom function that traps errors
            user.save(function (err, result) {
                if (err) {
                    return res.status(500).send({message: err.message});
                }
                res.status(200).send({token: createToken(result)});
            });
        });
    },
    login: function(req, res){
        User.findOne({email: req.body.email}).exec(function(err, user){
            if(!user){
                return res.status(401).send({message: 'Email invalid'});
            }

            if(req.body.pwd == user.pwd){
                console.log(req.body, user.pwd);
                return res.status(200).send({token: createToken(user)});
            }
            else{
                return res.status(401).send({message: 'Password invalid'});
            }
        });
    }
};

function createToken(user){
    console.log("\n\nThe object id is: " + user._id);
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, 'secret');
}