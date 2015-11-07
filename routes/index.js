var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { body: '<h1>hi</hi>' });
});

module.exports = router;
