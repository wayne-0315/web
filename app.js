require("dotenv").config();
//const createError = require('http-errors');
const express = require('express');
const session = require("express-session");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');


var app = express();
//資料庫連線
mongoose.set('strictQuery', false);
mongoose.connect(`${process.env.DBServerUrl}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error("連線發生問題", error));
db.once("open", () => console.log("成功連線資料庫"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/imgs', express.static(path.join(__dirname, 'public/imgs')));
app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts')));

app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({
    //   mongoUrl: process.env.DBServerUrl,
    //   collection: "session",
    //   ttl: 60 * 24, // (default: 14 days)
    // }),
  })
);
app.use('/blog', blogRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

//app.use('/session', sessionRouter);
// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
  next(createError(404));
});*/

app.get('/', (req, res) => {
  res.render('index');
})

// error handler
/*app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  res.send("Session Index");
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server started on port"));



module.exports = app;