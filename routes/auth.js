var express = require('express');

module.exports = function(passport) {

    var auth = express.Router();

    auth.get('/login', function(req, res) {
        res.render('login.hbs', { title: 'Login', message: req.flash('loginMessage') })
    })

    auth.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/auth/login');
    });

    auth.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure section
        failureRedirect : '/auth/login', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
    }));

    return auth;
}
