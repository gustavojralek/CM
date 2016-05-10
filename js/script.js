/*
var gui = require('nw.gui');
gui.Screen.Init(); // you only need to call this once


var screens = gui.Screen.screens;

console.log("startin screen........");

gui.Screen.chooseDesktopMedia(["window","screen"], 
  function(streamId) {
    var vid_constraint = {
      mandatory: {
        chromeMediaSource: 'desktop', 
        chromeMediaSourceId: streamId, 
        maxWidth: 1920, 
        maxHeight: 1080
      }, 
      optional: []
    };
    navigator.webkitGetUserMedia({audio: false, video: constraint}, success_func, fallback_func);
  }
);*/
//var app = require('http').createServer(handler)
var io = require('socket.io').listen(3000);
var fs = require('fs');

//app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});



var gui = require('nw.gui');
gui.Screen.Init();
win = gui.Window.get();


//win.showDevTools();
/*console.log("aa",gui.Screen.screens)
console.log(win);
console.log(gui.Screen.screens.length);*/

if (win.x < gui.Screen.screens[0].work_area.x){
   win.x = gui.Screen.screens[0].work_area.x + win.x;
}

var screenCB = {
    onDisplayAdded : function(screen) {
        win = gui.Window.get();
        if (win.x < screen.work_area.x) win.x = screen.work_area.x + win.x;
    }
};

gui.Screen.on('displayAdded', screenCB.onDisplayAdded);


function ScreenToString(screen) {
  var string = "";
  string += "screen " + screen.id + " ";
  var rect = screen.bounds;
  string += "bound{" + rect.x + ", " + rect.y + ", " + rect.width + ", " + rect.height + "} ";
  rect = screen.work_area;
  string += "work_area{" + rect.x + ", " + rect.y + ", " + rect.width + ", " + rect.height + "} ";
  string += " scaleFactor: " + screen.scaleFactor;
  string += " isBuiltIn: " + screen.isBuiltIn;
  string += "<br>";
  return string;
}

/*var gui = require('nw.gui');
gui.Screen.Init();
var string  = "" ; */

var screens = gui.Screen.screens;



/* for(var i=0;i<screens.length; i++) {
     document.write(string[i]);
     string += ScreenToString(screens[i]);
 }
*/
/*string += ScreenToString(screens[0]);
document.write(ScreenToString(screens[0]));
string += ScreenToString(screens[1]);
document.write(ScreenToString(screens[1]));
*/





var win2 = gui.Window.open ('msg.html', {
  x:screens[1].work_area.x,
  y:screens[1].work_area.y,
  fullscreen:true,
  toolbar: true,
  showDevTools: true
  /*kiosk:true*/
});

win.showDevTools();


/*win.on ('loaded', function(){
var document = win.window.document;

jQuery("#stats").text(thought);
});*/





