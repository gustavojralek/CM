var express = require('express');
var app = express();
var server = require('http').server(app);
var io = require('socket,io')(server); 




app.use(express.static(__dirname + '/public'));


// allow
app.all('*', function(req, res, nest){
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});