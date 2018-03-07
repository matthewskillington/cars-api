var express = require('express');
var mongodb= require('mongodb');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next();
  });

//Config for the databse
var dbConfig = require('./config/database.config.js');


// Mongoose local config
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function(){
    console.log('Could not connect to the database, now exiting');
    process.exit();
});

mongoose.connection.once('open', function(){
    console.log("Successfully connected to the database");
});


// define a simple route
app.get('/', function(req, res){
    res.json({"message": "Welcome to the API application. Add all your car info and retrieve here."});
});

// add routes
require('./app/routes/car.routes.js')(app);

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});