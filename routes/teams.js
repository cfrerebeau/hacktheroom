const Router = require('koa-router');

const router = new Router();
const store = require('../service/store')


router.post('/teams', async function (ctx, next) {
  const teamA = ctx.request.body.team1
  const unlock = store.get("unlock")
  const teamB = ctx.request.body.team2
  const NotfirstTime = store.get("TeamPageVisited")
  store.set("TeamPageVisited",true)
  const firstTime = NotfirstTime?false:true
  store.set("teamA", teamA)
  store.set("teamB", teamB)
  await ctx.render('teams.hbs', {'teamA': teamA, 'teamB': teamB, "unlock":unlock, 'firstTime':firstTime})
});


router.get('/teams', async function (ctx, next) {
  const teamA =   store.get("teamA")
  const unlock = store.get("unlock")
  const teamB =   store.get("teamB")
  if(teamA && teamB){
      await ctx.render('teams.hbs', {'teamA': teamA, 'teamB': teamB, "unlock":unlock})
    }
    else{
      await ctx.render('start.hbs')
    }
});

router.get('/teamA/email', async function (ctx, next) {
  const team =   store.get("teamA")
  const unlock = store.get("unlock")
  await ctx.render('teamA_email.hbs',{'team':team, 'email':"", "unlock":unlock})
});

router.post('/teamA/email', async function (ctx, next) {
  const team =   store.get("teamA")
  const unlock = store.get("unlock")
  const email = ctx.request.body.email.toLowerCase()
  if(email == "troll@hack.net"){
    store.set("emailFound",true)
    if(store.get("passwordFound")){
      store.set("unlock", true)
    }
    ctx.redirect("/teamA/train")
  }else{
    await ctx.render('teamA_email.hbs',{'team':team, 'has_error':true, 'email':email, "unlock":unlock})
  }

});

router.get('/teamA/train', async function (ctx, next) {
    const team =   store.get("teamA")
    const unlock = store.get("unlock")
    await ctx.render('teamA_train.hbs',{'team':team, "unlock":unlock})
});

router.get('/teamB/password', async function (ctx, next) {
  const team =   store.get("teamB")
  const unlock = store.get("unlock")
  await ctx.render('teamB_password.hbs',{'team':team, 'password':"", "unlock":unlock})
});

router.get('/teamB/print', async function (ctx, next) {
  const team =   store.get("teamB")
  const unlock = store.get("unlock")
  await ctx.render('teamB_print.hbs',{'team':team, "unlock":unlock})
});


router.post('/teamB/password', async function (ctx, next) {
  const team =   store.get("teamB")
  const unlock = store.get("unlock")
  const password = ctx.request.body.password.toLowerCase()
  if(password == "hacker2000"){
    store.set("passwordFound",true)
    if(store.get("emailFound")){
      store.set("unlock", true)
    }
    ctx.redirect("/teamB/print")
  }else{
    await ctx.render('teamB_password.hbs',{'team':team, 'has_error':true, 'password':password, "unlock":unlock})
  }

});

router.get('/virus', async function (ctx, next) {
  const teamB =   store.get("teamB")
  const teamA=   store.get("teamB")
  const unlock = store.get("unlock")
  const tries = store.get("passcodeTries")
  await ctx.render('virus.hbs',{'teamA':teamA,'teamB':teamB,  "unlock":unlock, "tries":tries, 'firstTime':true})
});

router.post('/virus', async function (ctx, next) {
  const teamB =   store.get("teamB")
  const teamA=   store.get("teamB")
  const unlock = store.get("unlock")
  const passcode = ctx.request.body.passcode.toLowerCase()
  if(passcode == "corentin2010"){
    ctx.redirect("/youwon")
  }else{
    var tries = store.get("passcodeTries")
    tries = tries?tries:3
    tries = tries - 1
    store.set("passcodeTries",tries)
    console.log("tries",tries)
    var nb_of_tries = "tree more tries"
    if(tries == 2){
        nb_of_tries = "2 more tries"
    }
    if(tries == 1)
        nb_of_tries = "1 more try"
    if(tries ==0)
        nb_of_tries = "lost"

    await ctx.render('virus.hbs',{
      'teamA':teamA,
      'teamB':teamB,
      'has_error':true,
      'passcode':passcode,
      "unlock":unlock,
      'firstTime':false,
      "nb_of_tries":nb_of_tries})
  }


  router.get('/youwon', async function (ctx, next) {
    const teamB =   store.get("teamB")
    const teamA=   store.get("teamB")
    await ctx.render('youwon.hbs',{'teamA':teamA,'teamB':teamB})
  });

});



module.exports = router;
