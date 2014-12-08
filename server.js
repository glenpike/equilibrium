var express = require('express'),
    bodyParser = require('body-parser'),
    presets = require('./routes/presets'),
    users = require('./routes/users'),
    types = require('./routes/types');

var app = express()

app.use(bodyParser.json())

app.use('/presets', presets)
app.use('/users', users)
app.use('/types', types)

app.listen(3000)

module.exports = app;
