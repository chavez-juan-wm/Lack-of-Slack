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
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 8080;

// Database, Schema, and Model
var database;
//var Message = mongoose.model({
//    message: String
//});

app.use(bodyParser.json());

// Middleware to fix a CORS issue
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Endpoint for post requests to '/api/message'
app.post('/api/message', function(req, res){
    console.log(req.body);
    database.collection('messages').insertOne(req.body);
    res.status(200);
});

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