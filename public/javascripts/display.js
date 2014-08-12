(function($, io, ready){
	ready(function(){
		socket.emit("ready");
	});
	var socket = io.connect("http://localhost:3000");
	socket.on('instruction',function(instruction){
		if(instruction.type == "navigation"){
			$('#content').attr('src',instruction.location);
		}
	});
})(jQuery, io, $(document).ready);