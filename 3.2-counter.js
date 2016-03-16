
var LedControl = require("rpi-led-control"); 


var display = new LedControl(13,5, 6);
display.setBrightness(0,15);

var  startTime = Date.now();

setInterval(loop, 2);

function loop() { 

	var num = (Date.now()-startTime);
	display.showNumber(0,num); 

}


