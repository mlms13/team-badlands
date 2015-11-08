var Entities = require('html-entities').AllHtmlEntities;
var _ = require('lodash');

var template = require('../views/tweet.hbs');

var twitter = require('./twitter');
var socket = require('./socket');

var htmlEntities = new Entities();

var twitterKeywords = [{
    regex: 'black\\s*(?:and|&)\\s*white',
    action: 'blackandwhite',
    type: 'ui'
}, {
    regex: 'color',
    action: 'color',
    type: 'ui'
}, {
    regex: 'faded',
    action: 'faded',
    type: 'ui'
}, {
    regex: 'sober',
    action: 'sober',
    type: 'ui'
}, {
    regex: 'sh(?:ake|aking|ook)',
    action: 'shake',
    type: 'ui'
}, {
    regex: 'trump',
    action: 'trump',
    type: 'character'
}, {
    regex: 'mario',
    action: 'mario',
    type: 'character'
}, {
    regex: 'luigi',
    action: 'luigi',
    type: 'character'
// }, {
//     regex: 'rain(?:ing|ed)?',
//     action: 'rain',
//     type: 'weather'
// }, {
//     regex: 'snow(?:ing|ed)?',
//     action: 'snow',
//     type: 'weather'
}, {
    regex: 'fart(?:ing|ed)?',
    action: 'fart',
    type: 'powerup'
}, {
    regex: 'netflix.*?chill',
    action: 'netflixandchill',
    type: 'powerup'
}, {
    regex: 'turbo',
    action: 'turbo',
    type: 'powerup'
}];

twitterKeywords = twitterKeywords.map(function(item) {
    item.regex = new RegExp('(^|\\s+)(#?' + item.regex + ')(\\s+|$)', 'gi');
    return item;
});

function matchKeywords(tweet, keywords) {
    var result = null,
        match;

    for (var i = 0, len = keywords.length; i < len; i++) {
        match = keywords[i].regex.test(htmlEntities.decode(tweet.text));

        if (match) {
            tweet.text = htmlEntities.decode(tweet.text).replace(keywords[i].regex, '$1<span class="tweet__content--highlight">$2</span>$3');

            result = _.extend({
                tweet: template(tweet),
            }, keywords[i]);

            break;
        }
    }

    return result;
}

twitter.stream(function(err, tweet) {

    if (err) {
        console.log(err);
        return;
    }

    var match = matchKeywords(tweet, twitterKeywords);

    if (match) {
        socket.emit('tweet', match);
    }
});
