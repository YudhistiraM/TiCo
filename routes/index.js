const express = require('express');
const router = express.Router();
const models = require('../models/index');
const util = require('../helpers/util');


module.exports = function(passport){
  /* GET home page. */
  router.get('/', function(req, res, next){
    res.render('login', { message: req.flash('loginMessage') });
  });

  // process the login form
  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // facebook Router
  router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
  }));

  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/'
  }));

  router.get('/connect/facebook', passport.authorize('facebook', {
    scope : 'email'
  }));

  // handle the callback after facebook has authorized the user
  router.get('/connect/facebook/callback', passport.authorize('facebook', {
    successRedirect : '/home',
    failureRedirect : '/'
  }));

  router.get('/auth/twitter', passport.authenticate('twitter', {
    scope: 'email'
  }));

  router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/home',
    failureRedirect: '/'
  }));

  router.get('/connect/twitter', passport.authorize('twitter', {
    scope: 'email'
  }));

  router.get('/connect/twitter/callback', passport.authorize('twitter', {
    successRedirect: '/home',
    failureRedirect: '/'
  }));

  router.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', { message: req.flash('signupMessage') });
  });

  // process the signup form
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/home', function(req, res, next) {
    res.render('home')
  });

  router.get('/mainPlan', function(req, res, next) {
    models.Plan.findAll({raw: true}).then(function(plans){
      res.render('mainPlan', {
        plans: plans,
        util: util
      });
    });
  });

  router.post('/addMainPlan', function(req, res, next) {
    models.Plan.create({
      title: req.body.title,
      type: req.body.type,
      purpose: req.body.purpose,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      notes: req.body.notes,
      status: "on process",
      userid: 1
    }).then(function(plan){
      res.redirect('../../mainPlan')
    });
  });

  router.get('/deleteMainPlan/:id', function(req, res, next) {
    models.Plan.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(plan){
      res.redirect('../../mainPlan')
    });
  });

  router.get('/viewMainPlan/:id', function(req, res, next) {
    models.Plan.findOne({
      where: {
        id: req.params.id
      }, raw: true
    }).then(function(plans){
      res.render('viewMainPlan', {
        plans: plans,
        util: util
      });
    });
  });

  router.get('/addSubPlan', function(req, res, next) {
    res.render('addSubPlan');
  });

  router.get('/viewMainPlan', function(req, res, next) {
    res.render('viewMainPlan');
  });

  router.get('/account', function(req, res, next) {
    res.render('account');
  });

  router.get('/report', function(req, res, next) {
    res.render('report');
  });

  router.get('/dailyActivity', function(req, res, next) {
    res.render('dailyActivity');
  });

  router.get('/logActivity', function(req, res, next) {
    res.render('logActivity');
  });



  return router;
}
