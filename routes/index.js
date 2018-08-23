var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/logout', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/mainPlan', function(req, res, next) {
  res.render('mainPlan');
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

module.exports = router;
