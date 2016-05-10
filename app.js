var time = new Object();

var gui = require('nw.gui');

//Monitor Espicifications
gui.Screen.Init();
win = gui.Window.get();
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


var screens = gui.Screen.screens;

console.log("Cantidad de monitores: "+screens.length);

if (screens.length > 1) {

    var win = gui.Window.open ('counter.html', {
      x:screens[0].work_area.x,
      y:screens[0].work_area.y,
      width:768,
      height:300,
      fullscreen:false,
      toolbar: false
    });

    var win2 = gui.Window.open ('msg.html', {
      x:screens[1].work_area.x,
      y:screens[1].work_area.y,
      fullscreen:true,
      toolbar: false,
      kiosk:true
    });


} else{

    var win = gui.Window.open ('counter.html', {
      fullscreen:false,
      toolbar: false, 
      width:768,
      height:300,
      position:"bottom"
    });

    var win2 = gui.Window.open ('msg.html', {
      x:screens[0].work_area.x,
      y:screens[0].work_area.y,
      fullscreen:true,
      toolbar: false
    });

    win.setAlwaysOnTop(true);


};


/*var win = gui.Window.open ('counter.html', {
  x:screens[0].work_area.x,
  y:screens[0].work_area.y,
  fullscreen:false,
  toolbar: true,
  showDevTools: true
});


var win2 = gui.Window.open ('msg.html', {
  x:screens[1].work_area.x,
  y:screens[1].work_area.y,
  fullscreen:false,
  toolbar: true,
  showDevTools: true
});
*/

