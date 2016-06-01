
var LedControl = require("rpi-led-control"); 


var lc = new LedControl(11,10,9);
lc.setBrightness(0,15);

var  startTime = Date.now();

setInterval(loop, 2);

function loop() { 

	var num = (Date.now()-startTime);
	lc.showNumber(0,num); 

}


