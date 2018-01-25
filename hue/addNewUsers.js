#! /usr/bin/env node
var HueApi = require("node-hue-api").HueApi;

var hostname = "10.0.1.13",
    userDescription = "device description goes here";

var displayUserResult = function(result) {
    console.log("Created user: " + JSON.stringify(result));
};

var displayError = function(err) {
    console.log(err);
};

var hue = new HueApi();

hue.createUser(hostname, function(err, user) {
    if (err) throw err;
    displayUserResult(user);
});
