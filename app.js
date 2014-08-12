/**
 * Module dependencies.
 */

var express = require('express.io');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();
app.http().io();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.cookieParser());
app.use(express.session({
	secret: 'henry is the greatest'
}));


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

routes(app);

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});