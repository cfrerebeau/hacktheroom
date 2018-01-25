const Router = require('koa-router');
const HueControl = require('../hue/hueControl')
const router = new Router();


router.get("/lights", async (ctx) => {
  var control = new HueControl()
  control.setAllLightOff()
  setTimeout(control.setAllLightOn, 500,control);
  setTimeout(control.setAllLightOff, 1000,control);
  setTimeout(function(){
    control.setBinary(5)
  }, 4000);
  setTimeout(function(){
    control.setBinary(1)
  }, 6000);
  setTimeout(function(){
    control.setBinary(7)
  }, 8000);
    setTimeout(control.setAllLightOff, 10000,control);
})

module.exports = router;
