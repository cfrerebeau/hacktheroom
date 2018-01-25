const Router = require('koa-router');
const HueControl = require('../hue/hueControl')
const router = new Router();


router.get("/admin/:id", async (ctx) => {
  var control = new HueControl()
  control.setBinary(ctx.params.id)
  ctx.body = "nb is " + ctx.params.id
})

module.exports = router;
