

const Koa = require('koa')
const views = require('koa-views')
const handlebars = require('handlebars')
const Router = require('koa-router')
const serve = require('koa-static')
const bodyParser = require('koa-body')

const app = new Koa()
const PORT = process.env.PORT || 8000
const router = new Router();

//Set up body parsing middleware
app.use(bodyParser({
   formidable:{uploadDir: './uploads'},
   multipart: true,
   urlencoded: true
}));


//serve files in public folder (css, js etc)
app.use(serve(__dirname + '/css'))
app.use(serve(__dirname + '/script'))
app.use(serve(__dirname + '/images'))
app.use(serve(__dirname + '/media'))
app.use(views(__dirname + '/views/', {
  map: {
    hbs: 'handlebars'
  },
  extension: 'hbs'
}))


app.use(require('./routes/start').routes())
app.use(require('./routes/admin').routes())
app.use(require('./routes/lights').routes())
app.use(require('./routes/teams').routes())
app.use(require('./routes/timer').routes())
//
//

const server = app.listen(PORT, () => {
  console.log(`Hack the room server listening on port: ${PORT}`)
})

module.exports = server
