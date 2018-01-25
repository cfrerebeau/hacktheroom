const hue = require('node-hue-api');
const HueApi = hue.HueApi;
const lightState = hue.lightState;

var displayResult = function(result) {
  console.log(result);
};

var displayError = function(err) {
  console.error(err);
};





const host = "10.0.1.13";
const username = "x1f8Zyo9GIOFSerCkhDfQUcSMYpg4dqUgixC-BP2";
const api = new HueApi(host, username);
const state = lightState.create();




const setLightOn = function(index) {
  console.log(`Turning lamp ${index} on`)
  api.setLightState(index, state.on())
    .then(displayResult)
    .fail(displayError)
    .done()
}

const setLightOff = function(index) {
  console.log(`Turning lamp ${index} off`)
  api.setLightState(index, state.off())
    .then(displayResult)
    .fail(displayError)
    .done()
}

const setAllLightOff = function() {
  setLightOff(6)
  setLightOff(7)
  setLightOff(9)
}

const setAllLightOn = function() {
  setLightOn(6)
  setLightOn(7)
  setLightOn(9)
}

const setBinary = function(nb) {
  setAllLightOff()
  if (nb % 2 == 1) {
    setLightOn(6)
  }
  if (nb == 2 || nb == 3 || nb == 6 || nb == 7) {
    setLightOn(7)
  }
  if (nb > 4) {
    setLightOn(9)
  }

}

module.exports = {
  'setAllLightOff': setAllLightOff,
  'setAllLightOn': setAllLightOn,
  'setBinary': setBinary
}
