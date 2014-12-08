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
    auth = require('./routes/auth')(passport);

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

app.use('/presets', presets)
app.use('/users', users)
app.use('/types', types)
app.use('/auth', auth)

app.listen(3000)

module.exports = app;
