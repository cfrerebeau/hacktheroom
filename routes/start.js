const Router = require('koa-router');
const store = require('../service/store')
const router = new Router();



router.get('/', async function (ctx, next) {
  await ctx.render('home.hbs')
});

router.get("/start", async (ctx) => {
    store.set("passcodeTries",3)
    await ctx.render('start.hbs')
})



module.exports = router;
