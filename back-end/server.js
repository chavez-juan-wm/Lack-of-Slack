var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 8080;

app.use(bodyParser.json());

app.post('/api/message', function(req, res){
    console.log(req.body);
    res.send('Post successful!');
    res.status(200);
});

var server = app.listen(port, function(){
    console.log("Server listening on localhost:%s", port);
});