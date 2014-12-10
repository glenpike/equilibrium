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
    types = require('./routes/types'),
    /* jshint  -W030 */
    auth = require('./routes/auth')(passport);
    /* jshint  +W030 */

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(session({
    secret: 'thisismysecret',
    resave: true,
    saveUninitialized: true
}))

app.set('view engine', 'hbs');

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function isLoggedIn(req, res, next) {
    if ( req.url === '/login' || req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
})

app.use('/presets', presets)
app.use('/', auth)
//TODO / FIXME - not public.
//app.use('/users', users)
//app.use('/types', types)

app.listen(3000)

module.exports = app;
