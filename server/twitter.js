/**
 * A module for interacting with the Twitter API
 * @module server/twitter
 */

var Twit = require('twit');

var T = new Twit({
    consumer_key        : process.env.TWITTER_KEY || 'dK06TUFEIcyhBCRxKmBQ',
    consumer_secret     : process.env.TWITTER_SECRET || 'yFXDLVdzizgBr3Pj7mLUuBtW23s6KWjJGupXm88Sno',
    access_token        : process.env.ACCESS_TOKEN || '2182619509-ZrQxEL9n2DHnpg80W1fFmY4RiNkYgYwKlyNU9M8',
    access_token_secret : process.env.TOKEN_SECRET || 'Ph11VCHTYF0FmHw9Zh6uqEozMrveoAnxTYZDZndXDB01n'
});

/**
 * A function to search past tweets based on a query, a date since, and a count.
 * @param {string} query - the query to search for
 * @param {int} count - the number of results to return
 * @param {function} next - the function to call with the results
 */
function search(query, count, next) {
    if (!query) {
        var error = new Error('Query Missing');
        error.status = 400;
        next(error);
    } else {
        T.get('search/tweets', {
            q     : query + '&since:2015-1-1',
            count : count || 100
        }, function(err, data, response) {
            if (err) {
                next(err);
            } else {
                next(null, data);
            }
        });
    }
}

function stream(cb) {
    var stream = T.stream('statuses/filter', { locations: [ -124.848974, 24.396308, -66.885444, 49.384358 ], language: 'en' });

    stream.on('tweet', function(tweet) {
        cb(null, tweet);
    });

    stream.on('error', function(err) {
        cb(err);
    });
}

module.exports = {
    search : search,
    stream : stream,
};
