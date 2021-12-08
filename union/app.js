var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var blogsRouter = require('./routes/blog-route');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
var cors = require('cors');

app.use(cors({ //it will allow cross sink btw backend and frontend 
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
}))

var mongoose = require('mongoose');
const uri = process.env.API_KEY;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.use("/public/images", express.static(path.join(__dirname, 'public/images')))


const alumni = require('./models/alumni');
const blog = require('./models/blog')
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/blogs', blogsRouter);
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