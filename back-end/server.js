/*
    Author: Juan M. Chavez
    Date: 3-3-17
    File: server.js
    Description: Back-end server created with Express

    3/3
        Setup a basic server on port 8080 with Express
        Added an endpoint for message posts
        Included body-parser to parse the body that comes with the request

    3/6
        Added middleware to fix: No 'Access-Control-Allow-Origin' header is present on the requested resource.
        Added mongodb support using mongoose
        Inserted req.body into a database in the post for 'api/message'

    3/8
        Changed the mongodb insert to a mongoose insert
        Created an endpoint for get requests for 'api/message'
 */

var express = require('express');
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Controllers
var auth = require('./controllers/auth');
var message = require('./controllers/message');

// Middleware
var checkAuthenticated = require('./services/checkAuthenticated');
var cores = require('./services/cores');
app.use(bodyParser.json());
app.use(cores);

// HTTP endpoints
app.get('/api/message', message.get);
app.post('/api/message', checkAuthenticated, message.post);
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);

// Connection to mongodb database
mongoose.connect('mongodb://localhost:27017/test', function(err, db){
    if(!err){
        console.log('Connected to MongoDB');
    }
});

var server = app.listen(port, function(){
    console.log("Server listening on localhost:%s", port);
});