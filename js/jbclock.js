var cdown;
var finishText;


function countKill(){
    $("video").remove();
    clearInterval(cdown);
    clearInterval(finishText);

    $(".topLayer").css({
        "background" : "none",
        "border-radius" : "0"
    });
    socket.emit('message',  "" );
}

function JBCountDown(settings) {

    var glob = settings;

    function deg(deg) {
        return (Math.PI/180)*deg - (Math.PI/180)*90
    }

    var now = Date.parse( new Date() ) /1000;
    var endDate = Date.parse(new Date(new Date().getTime() + glob.minutes*60000))/1000; 

    console.log(Math.floor((endDate - now)/86400));

    glob.total   = Math.floor((endDate - now)/86400);
    glob.days    = Math.floor((endDate - now ) / 86400);
    glob.hours   = 24 - Math.floor(((endDate - now) % 86400) / 3600);
    glob.minutes = 60 - Math.floor((((endDate - now) % 86400) % 3600) / 60) ;
    glob.seconds = 60 - Math.floor((endDate - now) % 86400 % 3600 % 60);
    
    if (now >= endDate) {
        return;
    }
    
    var clock = {
        set: {
            /*days: function(){
                var cdays = $("#canvas_days").get(0);
                var ctx = cdays.getContext("2d");
                ctx.clearRect(0, 0, cdays.width, cdays.height);
                ctx.beginPath();
                ctx.strokeStyle = glob.daysColor;
                
                ctx.shadowBlur    = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = glob.daysGlow;
                
                ctx.arc(94,94,85, deg(0), deg((360/glob.total)*(glob.total - glob.days)));
                ctx.lineWidth = 17;
                ctx.stroke();
                $(".clock_days .val").text(glob.days);
            },*/
            
            hours: function(){
                var cHr = $("#canvas_hours").get(0);
                var ctx = cHr.getContext("2d");
                ctx.clearRect(0, 0, cHr.width, cHr.height);
                ctx.beginPath();
                ctx.strokeStyle = glob.hoursColor;
                
                ctx.shadowBlur    = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = glob.hoursGlow;
                
                ctx.arc(94,94,85, deg(0), deg(15*glob.hours));
                ctx.lineWidth = 17;
                ctx.stroke();
                $(".clock_hours .val").text(24 - glob.hours);
            },
            
            minutes : function(){
                var cMin = $("#canvas_minutes").get(0);
                var ctx = cMin.getContext("2d");
                ctx.clearRect(0, 0, cMin.width, cMin.height);
                ctx.beginPath();
                ctx.strokeStyle = glob.minutesColor;
                
                ctx.shadowBlur    = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = glob.minutesGlow;
                
                ctx.arc(94,94,85, deg(0), deg(6*glob.minutes));
                ctx.lineWidth = 17;
                ctx.stroke();
                $(".clock_minutes .val").text(60 - glob.minutes);
            },
            seconds: function(){
                var cSec = $("#canvas_seconds").get(0);
                var ctx = cSec.getContext("2d");
                ctx.clearRect(0, 0, cSec.width, cSec.height);
                ctx.beginPath();
                ctx.strokeStyle = glob.secondsColor;
                
                ctx.shadowBlur    = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = glob.secondsGlow;
                
                ctx.arc(94,94,85, deg(0), deg(6*glob.seconds));
                ctx.lineWidth = 17;
                ctx.stroke();
        
                $(".clock_seconds .val").text(60 - glob.seconds);
            }
        },
       
        start: function(){
            /* Seconds */
            cdown = setInterval(function(){
                if ( glob.seconds > 59 ) {
                    if (60 - glob.minutes == 0 && 24 - glob.hours == 0 && glob.days == 0) {
                        clearInterval(cdown);
                        
                        /* Countdown is complete */

                        finish();
                        
                        return;
                    }
                    glob.seconds = 1;
                    if (glob.minutes > 59) {
                        glob.minutes = 1;
                        clock.set.minutes();
                        if (glob.hours > 23) {
                            glob.hours = 1;
                            if (glob.days > 0) {
                                glob.days--;
                                clock.set.days();
                            }
                        } else {
                            glob.hours++;
                        }
                        clock.set.hours();
                    } else {
                        glob.minutes++;
                    }
                    clock.set.minutes();
                } else {
                    glob.seconds++;
                }
                clock.set.seconds();
            },1000);
        }
     
    }
    clock.set.seconds();
    clock.set.minutes();
    clock.set.hours();
  /*  clock.set.days();*/
    clock.start();
 
}


function finish(){
    socket.emit('message',  "TIEMPO CUMPLIDO" );

    $(".topLayer").css({
        "background" : "rgb(35, 38, 41)",
        "border-radius" : "100px"
    })

    var elem = $('#msgs');
    finishText= setInterval(function() {

        if (elem.css('visibility') == 'hidden') {
            elem.css('visibility', 'visible');
        } else {
            elem.css('visibility', 'hidden');
        }    
    }, 500);
    
    $("body").prepend("<video autoplay loop><source src='videos/fireworks.mp4' type='video/mp4'><source src='videos/fireworks.webm' type='video/webm'></video>");
}