var tweetDOM = document.querySelector('.live-tweet'),
    socket;

function init () {
    var timeout;
	socket = io.connect('http://localhost:' + window.port);

	socket.on('tweet', function (data) {

        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }

        tweetDOM.innerHTML = data.tweet;

        tweetDOM.firstChild.classList.add('tweet--visible');

        timeout = setTimeout(function() {
            tweetDOM.firstChild.classList.remove('tweet--visible');
        }, 2500);
	});

	return socket;
}

module.exports = {
	init : init
};
