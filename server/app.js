var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('./auth/passport');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const garmentsRouter = require('./routes/garments');
const authRouter = require('./routes/auth');
const historiesRouter = require('./routes/histories');


var app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser("NOT_A_GOOD_SECRET"));

app.use(session({
    secret: "NOT_A_GOOD_SECRET",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/garments', garmentsRouter);
app.use('/histories', historiesRouter);

module.exports = app;
