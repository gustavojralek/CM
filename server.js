
console.log("Starting.....");


var app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http);


http.listen(8080, function(){
  console.log('listening on *:8080');
});



io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('message', msg);
  });

  socket.on('minutes', function(msg){
    io.emit('minutes', msg);
  });
});

/*io.on('connection', function (socket){
	socket.emit('news',  'hi' );

  	console.log('a user connected');
	
	socket.on('msg', function (data) {
    	console.log("msg "+data);
  	});

  	socket.on('news', function (text){
  		console.log("news "+text);
  	});

});
*/


