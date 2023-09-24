var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var managementRouter = require('./routes/management');
var gridFollowingRouter = require('./routes/gridfollowing');

// It instantiates Express and assigns our app variable to it
var app = express();

// configure a bunch of Express stuff (engine setup)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Telling Express to serve static objects from the /public/ dir, 
// but to make them actually seem like they're coming from the top level 
// (it also does this with the views directory)
// Ex: C:\node\nodetest1\public\images -> http://localhost:3000/images
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/management', managementRouter);
app.use('/gridfollowing', gridFollowingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;