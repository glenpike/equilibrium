var express = require('express'),
    mongoskin = require('mongoskin'),
    dbConf = require('../config/database'),
    bcrypt   = require('bcrypt-nodejs');

var db = mongoskin.db(dbConf.url, {safe:true})

//Every route requires the database...
/*auth.use('/', function(req, res, next) {
    req.collection = db.collection('auth')
    return next()
})*/
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/auth/login');
}

module.exports = function(passport) {

var auth = express.Router();
auth.get('/login', function(req, res) {
    res.render('login.hbs', { message: req.flash('loginMessage') })
})

auth.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/auth/login');
});

auth.post('/login', passport.authenticate('local-login', {
    successRedirect : '/presets', // redirect to the secure profile section
    failureRedirect : '/auth/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

//auth.post('/login', function(req, res, next) {
    // req.collection.insert(req.body, {}, function(e, results) {
    //     if(e) {
    //         return next(e)
    //     }
    //     res.send(results)
    // })
//})
return auth;
}


//module.exports = auth;
