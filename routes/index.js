var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'html' });
});

router.get('/dashboard.html', function(req, res, next) {
  res.render('dashboard', { title: 'html' });
});

router.get('/analytics.html', function(req, res, next) {
  res.render('analytics', { title: 'html' });
});

router.get('/inventory.html', function(req, res, next) {
  res.render('inventory', { title: 'html' });
});

router.get('/sales.html', function(req, res, next) {
  res.render('sales', { title: 'html' });
});


module.exports = router;