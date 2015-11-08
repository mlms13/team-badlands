var Entities = require('html-entities').AllHtmlEntities;
var _ = require('lodash');

var template = require('../views/tweet.hbs');

var twitter = require('./twitter');
var socket = require('./socket');

var htmlEntities = new Entities();

var twitterKeywords = [{
    regex: 'black\\s*(?:and|&)\\s*white',
    action: 'blackandwhite',
}, {
    regex: 'color',
    action: 'color',
}, {
    regex: 'faded',
    action: 'faded',
}, {
    regex: 'sh(?:ake|aking|ook)',
    action: 'shake',
}, {
    regex: 'trump',
    action: 'trump',
}, {
    regex: 'mario',
    action: 'mario',
}, {
    regex: 'luigi',
    action: 'luigi',
}, {
    regex: 'rain(?:ing|ed)?',
    action: 'rain',
}, {
    regex: 'snow(?:ing|ed)?',
    action: 'snow',
}, {
    regex: 'fart(?:ing|ed)?',
    action: 'fart',
}, {
    regex: 'netflix.*?chill',
    action: 'netflixandchill',
}, {
    regex: 'turbo',
    action: 'turbo'
}];

twitterKeywords = twitterKeywords.map(function(item) {
    item.regex = new RegExp('(?:^|\\s+)(#?' + item.regex + ')(?:\\s+|$)', 'gi');
    return item;
});

function matchKeywords(tweet, keywords) {
    var matches = [],
        match;

    for (var i = 0, len = keywords.length; i < len; i++) {
        match = keywords[i].regex.exec(htmlEntities.decode(tweet.text));

        if (match) {
            matches.push(_.extend({
                match: match,
                tweet: template(tweet),
            }, keywords[i]));
        }
    }

    return (matches.length ? matches : null);
}

twitter.stream(function(err, tweet) {

    if (err) {
        console.log(err);
        return;
    }

    var matches = matchKeywords(tweet, twitterKeywords);

    if (matches) {
        socket.emit('tweet', matches);
    }
});
