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
  models.Plan.findAll({
    where: {
      parentplan: null
    },
    order: [
      ['id', 'DESC'],
    ],
    raw: true
  }).then(function(plans){
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
    createLog("Add main plan", function(){
      res.redirect('../../mainPlan')
    });
  });
});

router.get('/addSubPlan/:id', function(req, res, next) {
  models.Plan.create({
    title: req.query.title,
    type: req.query.type,
    startdate: req.query.startdate,
    enddate: req.query.enddate,
    notes: req.query.notes,
    status: "on process",
    userid: 1,
    parentplan: req.params.id
  }).then(function(plan){
    res.redirect(`../../viewMainPlan/${req.params.id}`)
  });
});

router.get('/deleteMainPlan/:id', function(req, res, next) {
  models.Plan.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(plan){
    createLog("Delete main plan", function(){
      res.redirect('../../mainPlan')
    });
  });
});

router.get('/editMainPlan/:id', function(req, res, next) {
  models.Plan.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(data){
    res.render('editMainPlan', {
      data: data,
      util: util
    });
  });
});

router.post('/editMainPlan/:id', function(req, res, next) {
  models.Plan.find({
    where: {
      id: req.params.id
    },
  }).then(function(plan) {
    plan.updateAttributes({
      title: req.body.title,
      type: req.body.type,
      purpose: req.body.purpose,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      notes: req.body.notes,
      status: req.body.status
    }).then(function(plan) {
      createLog("Edit main plan", function(){
        res.redirect('../../mainPlan')
      });
    });
  });
});

router.get('/addSubPlan', function(req, res, next) {
  res.render('addSubPlan');
});

router.get('/viewMainPlan/:id', function(req, res, next) {
  let id = req.params.id;
  models.Plan.findAll({where: {id: id}, raw: true}).then(function(data){
    models.Plan.findAll({where: {parentplan: id}, raw: true}).then(function(sub1){
      console.log(data);
      console.log(sub1);
      res.render('viewMainPlan', {
        data: data,
        sub1: sub1
      });
    });
  });
});

router.post('/viewMainPlan/:id', function(req, res, next) {
  models.Plan.find({
    where: {
      id: req.params.id
    },
  }).then(function(plan) {
    plan.findAll({
      title: title,
      type: type,
      purpose: purpose,
      startdate: startdate,
      enddate: enddate,
      notes: notes,
      status: status
    }).then(function(plan) {
      res.redirect('../../viewMainPlan')
    });
  });
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
  models.Log.findAll({
    order: [
      ['id', 'DESC'],
    ],
    raw: true
  }).then(function(logs){
    res.render('logActivity', {
      logs: logs
    });
  });
});


function createLog(note, cb){
  models.Log.create({
    logdate: Date.now(),
    lognote: note,
  }).then(function(x){
    cb();
  });
}

module.exports = router;
