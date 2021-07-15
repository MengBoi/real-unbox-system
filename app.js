require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var propertyRoute = require('./routes/propertyRoutes');
var locationRoute = require('./routes/locationRoutes');
var homeRoute = require('./routes/homeRoutes');
var telegramRoute = require('./routes/telegramRoutes');
var photographyPortfolioRoutes = require('./routes/photographyPortfolioRoutes');
var searchRoutes = require('./routes/searchRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// app.use('/users', usersRouter);

app.use('/', (err, req, res, next) => {
  console.log('ru');
  next();
});

//mount router
app.use('/api/v1/property', propertyRoute);
app.use('/api/v1/location', locationRoute);
app.use('/api/v1/home', homeRoute);
app.use('/api/v1/bot', telegramRoute);
app.use('/api/v1/portfolio', photographyPortfolioRoutes);
app.use('/api/v1/search', searchRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
