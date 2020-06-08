var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('./services/mongoose');
var adminController = require('./controllers/admin.controller');
var adminRouter = require('./routes/admin.route');
var quizRouter = require('./routes/quiz.route');
var { errorHandler } = require('./errors/errorhandler');

var app = express();

app.use(logger('dev'));
app.use(express.json());

//you may want to use extended because of nested models when sent from
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'))

app.use('/api/admin', adminRouter);
app.use('/api/quiz', quizRouter);
app.use(errorHandler);

mongoose.connect();

adminController.defaultAccount();

module.exports = app;
