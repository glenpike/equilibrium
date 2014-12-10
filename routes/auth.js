var express = require('express');

module.exports = function(passport) {

    var auth = express.Router();

    auth.get('/login', function(req, res) {
        res.render('login.hbs', { message: req.flash('loginMessage') })
    })

    auth.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    auth.post('/login', passport.authenticate('local-login', {
        successRedirect : '/presets', // redirect to the secure section
        failureRedirect : '/login', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
    }));

    return auth;
}
