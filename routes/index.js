var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/manageMainPlan', function(req, res, next) {
  res.render('manageMainPlan');
});

router.get('/addSubPlan', function(req, res, next) {
  res.render('addSubPlan');
});

router.get('/viewMainPlan', function(req, res, next) {
  res.render('viewMainPlan');
});

module.exports = router;
