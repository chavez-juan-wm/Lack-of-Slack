var jwt = require('jwt-simple');
var moment = require('moment');

// Middleware to check if the user is authenticated
module.exports =
    function checkAuthenticated(req, res, next){
        if(!req.header('Authorization')){
            return res.status(401).send({message: "Check that your request has an authorization header."});
        }

        var token = req.header('Authorization').split(' ')[1];
        var payload = jwt.decode(token, 'secret');

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: "Your token has expired."});
        }

        req.user = payload.sub;
        next();
    };