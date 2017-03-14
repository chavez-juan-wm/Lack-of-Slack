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
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 8080;

// Database, Schema, and Model
var database;

// Mongoose's method to create a model/class
var Message = mongoose.model('Message', {
    msg: String
});

app.use(bodyParser.json());

// Middleware to fix a CORS issue
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Endpoint for the client to retrieve all of the messages in the database
app.get('/api/message', getMessages);

// Endpoint for post requests to '/api/message'
app.post('/api/message', function(req, res){
    console.log(req.body);

    // Create a Message object and insert a string/req.body, then save it
    var message = new Message(req.body);
    message.save();
    res.status(200);
});

// Get the messages from the database
function getMessages(req, res){
    Message.find({}).exec(function(err, data){
        res.send(data);
    });
}

// Connection to mongodb database
mongoose.connect('mongodb://localhost:27017/test', function(err, db){
    if(!err){
        console.log('Connected to MongoDB');
        database = db;
    }
});

var server = app.listen(port, function(){
    console.log("Server listening on localhost:%s", port);
});