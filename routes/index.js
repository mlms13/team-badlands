var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Team Badlands',
        envPort: process.env.PORT || 8080
    });
});

module.exports = router;
