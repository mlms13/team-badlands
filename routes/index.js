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

  function generateTweet(tweets) {
    var terminals = {};
    var startwords = [];
    var wordstats = {};

    for (var i = 0; i < tweets.length; i++) {
      var words = parseTweet(tweets[i].text.split(' '));
      terminals[words[words.length-1]] = true;
      startwords.push(words[0]);
      for (var j = 0; j < words.length - 1; j++) {
        if (wordstats.hasOwnProperty(words[j])) {
          wordstats[words[j]].push(words[j+1]);
        } else {
          wordstats[words[j]] = [words[j+1]];
        }
      }
    }

    function parseTweet(words) {
      var result = [];
      for (var i = 0; i < words.length; i++) {
        if (words[i].indexOf('@') < 0 && words[i].indexOf('http') < 0 && words[i].toUpperCase() !== 'RT') {
          result.push(words[i]);
        }
      }
      return result;
    }

    function choice(a) {
      var i = Math.floor(a.length * Math.random());
      return a[i];
    }

    function makeTweet(min_length) {
      word = choice(startwords);
      var tweet = [word];
      while (wordstats.hasOwnProperty(word)) {
        var next_words = wordstats[word];
        word = choice(next_words);
        tweet.push(word);

        if (tweet.length > min_length && terminals.hasOwnProperty(word)) {
          break;
        }
      }
      if (tweet.length < min_length) {
        return makeTweet(min_length);
      }
      return tweet.join(' ');
    }

    return makeTweet(10);
  }

  twitter.search(req.body.searchTerm, 10000, function(err, data) {
    if (err) {
      throw err;
    } else {
      res.render('index', {
        title: 'Results - Team Badlands',
        content: generateTweet(data.statuses)
      });
    }
  });
});

module.exports = router;
