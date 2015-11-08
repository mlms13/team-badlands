var EventEmitter = require('wolfy87-eventemitter');
var ee = new EventEmitter();

var socket;

function init () {
	socket  = io.connect('http://localhost:' + window.port);

	socket.on('tweet', function (data) {
		ee.emit('tweet', data); // todo: this feels weird to emit an event with the same name, just naming?
	});
}

module.exports = ee;
module.exports.init = init;
