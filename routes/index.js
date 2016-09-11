var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'WebDxD', user: req.user });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res, next) {

  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { error : err.message });
    }
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    if (! user) {
      return res.render('login', { error : 'authentication failed' });
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

router.get('/map', function(req, res) {
  res.render('map');
});

module.exports = router;
