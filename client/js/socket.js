var tweetDOM = document.querySelector('.live-tweet'),
    socket;

function init () {
	socket = io.connect('http://localhost:' + window.port);

	socket.on('tweet', function (data) {
        tweetDOM.innerHTML = data.tweet;
	});

	return socket;
}

module.exports = {
	init : init
};
