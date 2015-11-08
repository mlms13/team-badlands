var Entities = require('html-entities').AllHtmlEntities;
var _ = require('lodash');

var twitter = require('./twitter');

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
    regex: 'shak(?:e|ing)',
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
}];

twitterKeywords = twitterKeywords.map(function(item) {
    item.regex = new RegExp('(?:^|\\s+|#)(' + item.regex + ')(?:\\s+|$)', 'gi');
    return item;
});

function matchKeywords(str, keywords) {
    var matches = [],
        match;

    for (var i = 0, len = keywords.length; i < len; i++) {
        match = keywords[i].regex.exec(str);

        if (match) {
            matches.push(_.extend({
                match: match,
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

    var matches = matchKeywords(htmlEntities.decode(tweet.text), twitterKeywords);

    if (matches) {
        console.log(matches);
    }
});