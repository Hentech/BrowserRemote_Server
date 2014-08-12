var socket = io.connect('http://localhost:3000');

$("#address_bar-input").keyup(function(e) {
	if (e.keyCode == 13) {
		var location = $(this).val();
		$('#content').attr('src', "http://localhost:3000/p/" + location);
	}
});
