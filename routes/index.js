const express = require('express');
const router = express.Router();
const models = require('../models/index');
const util = require('../helpers/util');

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
  res.render('home')
});

router.get('/mainPlan', function(req, res, next) {
  models.Plan.findAll({raw: true}).then(function(plans){
    res.render('mainPlan', {
      plans: plans
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

router.post('/deleteMainPlan/:id', function(req, res, next) {
  models.Plan.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(plan){
    res.redirect('../../mainPlan')
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

module.exports = router;
