///////////////////////////////////////////////
// Browser Remote (the server)               //
// By Henry Troutman (henguin1001@gmail.com) //
///////////////////////////////////////////////

var app = require('http').createServer(function() {

	}),
	io = require('socket.io')(app),
	config = require('./config.json');

require('./routes')(io);

app.listen(config.port_number);