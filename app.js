var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var winston = require("./config/winston-config");
var fs = require("fs");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

nunjucks.configure('views', {
  autoescape: true,
  express   : app
});
app.set('view engine', 'njk');



app.use(morgan("combined", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
