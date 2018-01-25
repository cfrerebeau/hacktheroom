const Router = require('koa-router');
const store = require('../service/store')
const router = new Router();



function printTime(time) {
  var sec = 3600 - Math.floor(time / 1000)

  var color = "#00dd00" //green
  if(sec < 1800)
  {
    color = "#f4ff00" //yellow
  }

  if(sec < 900)
  {
    color = "#d00" //red
  }

  const h = Math.floor(sec / 3600)
  const min = Math.floor((sec - h * 3600) / 60)
  sec = sec - 60 * min - 3600 * h

  return `<span style="color:${color}">${pd(min)}:${pd(sec)}</span>`
}

function pd(n){
  if(n < 10){
    return `0${n}`
  }
  else{
    return n
  }
}

router.get('/timer/start', function(ctx, next) {
  const startDate = new Date()
  store.set("startTime", startDate.getTime())
  return ctx.body = ""
})

router.get('/timer/get', function(ctx, next) {

  const startTime = store.get("startTime")
  if (startTime == null){
    ctx.redirect("/timer/start")
  }

  const finishTime = store.get("finishTime")

  if (finishTime){
    return ctx.body = finishTime + " finished"
  }
  else{
    const startTime = store.get("startTime")
    const time = (new Date()).getTime() - startTime
    return ctx.body = printTime(time)
  }
})

router.get('/timer/stop', function(ctx, next) {
  const finishTime = store.get("finishTime")
  if (!finishTime) {
    const startTime = store.get("startTime")
    const endTime = (new Date()).getTime()

    const time = endTime - startTime
    finishTime = printTime(time)
    store.set("finishTime", finishTime)
  }
  return ctx.body = finishTime + " finished"
})


module.exports = router;
