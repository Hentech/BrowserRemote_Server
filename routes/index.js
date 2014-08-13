
////////////
// routes //
////////////

var shortId = require('shortid');
shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');


module.exports = function(io){

	io.on('connection',function(socket){
		var session_id;
		// when a remote needs a new id
		socket.on('server-get_session_id',function(){
			session_id = shortId.generate();
			socket.join(session_id);
			socket.emit('server-incoming_id', session_id);

		});

		// when a display needs to connect to an id, and a confirmation
		socket.on('server-set_session_id',function(id){
			session_id = id;
			socket.join(session_id);
			socket.emit('server-confirm_id', session_id);
		});
		
		socket.on('server-unbind',function(){
			socket.leave(session_id);
			session_id = undefined;
		});
		// SOON TO BE set_location
		socket.on('pageLoad',function(location){
			console.log("test:" + session_id);
			socket.to(session_id).emit('server-set_location', location);
		});
	});
};

