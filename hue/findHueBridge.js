#! /usr/bin/env node
const hue = require('node-hue-api');
const  HueApi = hue.HueApi;
const lightState = hue.lightState;

var displayResult = function(result) {
  console.log(result);
};

var displayError = function(err) {
  console.error(err);
};

var host = "10.0.1.13";
const username = "x1f8Zyo9GIOFSerCkhDfQUcSMYpg4dqUgixC-BP2";
const api = new HueApi(host, username);
const state = lightState.create();

// using getConfig() alias
api.getConfig(function(err, config) {
    if (err) throw err;
    displayResult(config);
});

// --------------------------
// Using a callback
// api.lights(function(err, lights) {
//   if (err) throw err;
//   displayResult(lights);
// });

//
// // Set the lamp with id '2' to on
// api.setLightState(2, state.on())
//   .then(displayResult)
//   .fail(displayError)
//   .done();
//
// // Now turn off the lamp
// api.setLightState(2, state.off())
//   .then(displayResult)
//   .fail(displayError)
//   .done();
//
// // --------------------------
// // Using a callback
// // Set the lamp with id '2' to on
// api.setLightState(2, state.on(), function(err, result) {
//   if (err) throw err;
//   displayResult(result);
// });
//
// // Now turn off the lamp
// api.setLightState(2, state.off(), function(err, result) {
//   if (err) throw err;
//   displayResult(result);
// });
