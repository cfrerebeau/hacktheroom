#! /usr/bin/env node

const hue = require('node-hue-api');
const HueApi = hue.HueApi;
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

api.setLightState(6, state.off())
  .then(displayResult)
  .fail(displayError)
  .done();

api.setLightState(7, state.off())
  .then(displayResult)
  .fail(displayError)
  .done();

api.setLightState(9, state.off())
  .then(displayResult)
  .fail(displayError)
  .done();
