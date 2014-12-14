/* global require */
var express = require('express'),
    app = express()
    bodyParser = require('body-parser'),
    passport = require('passport'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),

    require('./config/passport')(passport),
    presets = require('./routes/presets'),
    users = require('./routes/users'),
    user = require('./routes/user'),
    types = require('./routes/types'),
    /* jshint  -W030 */
    auth = require('./routes/auth')(passport),
    /* jshint  +W030 */
    path = require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(session({
    secret: 'thisismysecret',
    resave: true,
    saveUninitialized: true
}))

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function isLoggedIn(req, res, next) {
    console.log('isLoggedIn ', req.url)
    if ( req.url === '/auth/login' || req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
})

app.use('/presets', presets)
app.use('/auth', auth)
app.use('/user', user)
app.use('/types', types)

app.use('/', function(req, res) {
    console.log('hello')
    res.render('main.hbs')
})
//TODO / FIXME - not public.
//app.use('/users', users)

app.listen(3000)

module.exports = app;
