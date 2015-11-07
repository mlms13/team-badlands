var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var twitter = require('../server/twitter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Team Badlands',
    content: 'hi'
  });
});

router.post('/', bodyParser.urlencoded({ extended: true }), function(req, res, next) {
  twitter.search(req.body.searchTerm, 1, function(err, data) {
    if (err) {
      throw err;
    } else {
      res.render('index', {
        title: 'Results - Team Badlands',
        content: data.statuses[0].text
      });
    }
  });
});

module.exports = router;
