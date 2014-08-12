
////////////
// routes //
////////////

var shortId = require('shortid');

module.exports = function(app){
	app.io.route('ready', function(req){
		// req.io.join('test');
		
	});
	// when a remote needs a new id
	app.io.route('server-get_session_id',function(req){
		var session_id = shortId.generate();
		req.io.emit('server-incoming_id', session_id);
		req.io.join(session_id);
		req.session.session_id = session_id;
		req.session.save(function(){});
	});
	// when a display needs to connect to an id, and a confirmation
	app.io.route('server-set_session_id',function(req){
		var session_id = req.data;
		req.io.emit('server-confirm_id', session_id);
		req.io.join(session_id);
		req.session.session_id = session_id;
		req.session.save(function(){});
	});
	
	app.io.route('server-unbind',function(req){
		var session_id = req.session.session_id;
		req.io.leave(session_id);
		req.session.session_id = undefined;
		req.session.save(function(){});
	});


	// SOON TO BE set_location
	app.io.route('pageLoad',function(req){
		app.io.room(req.session.session_id).broadcast('locationChange', req.data);
	});

	app.get('/',function(req, res){
		res.sendfile('views/test.html');
	});
	


};

