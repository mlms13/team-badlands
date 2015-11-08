var tweetDOM = document.querySelector('.live-tweet'),
    socket;

function init () {
	socket = io.connect('http://localhost:' + window.port);

	socket.on('tweet', function (data) {
        tweetDOM.innerHTML = data.tweet;

        tweetDOM.firstChild.classList.add('tweet--visible');

        setTimeout(function() {
            tweetDOM.firstChild.classList.remove('tweet--visible');
        }, 2000);
	});

	return socket;
}

module.exports = {
	init : init
};
