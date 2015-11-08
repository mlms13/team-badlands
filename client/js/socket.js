var socket;

function init () {
	socket  = io.connect('http://localhost:8080');

	socket.on('tweet', function (data) {
		console.log('We got new tweet data: ', data);
	});
}

module.exports = {
	init : init
};