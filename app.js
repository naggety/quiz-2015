// carga archivo .env para variables de entorno
// var env = require('node-env-file');
// env(__dirname + '/.env');

// carga módulos varios
var express = require('express');
var partials = require('express-partials');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());  // para usar layouts
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('Quiz2015ih'));
app.use(session());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

// autentificación
app.use(function(req, res, next) {
  if (!req.path.match(/\/login|\/logout/))
    req.session.redir = req.path;
  else if (typeof req.session.redir == 'undefined')
    req.session.redir = '/';
  res.locals.session = req.session;
  next();
})

// autologout
app.use(function(req, res, next) {
  var lasttime = req.session.lastvisited;
  var nowtime = new Date().getTime();
  if (!req.session.user) {
    delete req.session.lastvisited;
  }
  else if (lasttime && lasttime < nowtime - 120000) {
    delete req.session.user;
    delete req.session.lastvisited;
  }
  else {
    req.session.lastvisited = nowtime;
  }
  next();
});

// rutas api REST
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
