var app = require('http').createServer(function() {

});
var io = require('socket.io')(app);
require('./routes')(io);
app.listen(80);
