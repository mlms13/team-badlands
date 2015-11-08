var socket;

function init (server) {
	socket = require('socket.io')(server);

	socket.on('connection', onSocketConnection);
}

function emit (type, data) {
	socket.emit(type, data);
}

function onSocketConnection (s) {
	console.log('A new socket connection has been made.');
}

module.exports = {
	init : init,
	emit : emit
};