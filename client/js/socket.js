var socket;

function init () {
	socket  = io.connect('http://localhost:8080'); // TODO, if on prod, this will be a different port - maybe we can front-load a var?

	socket.on('tweet', function (data) {
		console.log('We got new tweet data: ', data);
	});
}

module.exports = {
	init : init
};
