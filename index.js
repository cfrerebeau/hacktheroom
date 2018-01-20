

const Koa = require('koa')
const views = require('koa-views')
const serve = require('koa-static')
const handlebars = require('handlebars')
const Router = require('koa-router')

const app = new Koa()
const PORT = process.env.PORT || 8000
const router = new Router();
//handlebarsHelper.registerPartial()

// serve files in public folder (css, js etc)
app.use(serve(__dirname + '/css'))
app.use(serve(__dirname + '/images'))
app.use(serve(__dirname + '/media'))
app.use(views(__dirname + '/views/', {
  map: {
    hbs: 'handlebars'
  }
}))



router.get('/', async function (ctx, next) {
 await ctx.render('home.hbs')
});

app.use(require('./routes/admin').routes())


app.use(router.routes())
const server = app.listen(PORT, () => {
  console.log(`Hack the room server listening on port: ${PORT}`)
})

module.exports = server
