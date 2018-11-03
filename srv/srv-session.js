const express = require('express');
const session = require('express-session');
const PostgreSqlStore = require('connect-pg-simple')(session);

var app = express();

var sessionOptions = {
  secret: 'secret-key',
  resave: true,
  saveUninitialized: false,
  store: new PostgreSqlStore({
    conString: 'postgres://kbuser:j@119.29.171.215:5432/kb'
  })
};

app.use(session(sessionOptions));

app.get('/', (req, res)=>{
  if(!req.session.views){
    req.session.views = 1;
  }
  else {
    req.session.views += 1;
  }
  res.json({
    'status': 'ok',
    'frequency': req.session.views
  });
});

app.listen(3000, ()=>{console.log('started');});
