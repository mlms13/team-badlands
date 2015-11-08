var socket;

function init (server) {
	socket = require('socket.io')(server);

	socket.on('connection', onSocketConnection);
}

function onSocketConnection (s) {
	console.log('A new socket connection has been made.');
}

function emit (type, data) {
	socket.emit(type, data);
}

module.exports = {
	init : init,
	emit : emit
};
