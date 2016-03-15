
var LedControl = require("../rpi-led-control"); 
var usonic = require('r-pi-usonic');

var sensor;

var echoPin = 24, 
	triggerPin = 23;


var display = new LedControl(13,5, 6);
display.setBrightness(0,15);

var  startTime = Date.now();


usonic.init(function (error) {
    if (error) {
        console.log(error);
    } else {
	 	sensor = usonic.createSensor(echoPin, triggerPin, 750); // last parameter is timeout
		setInterval(loop, 50);
    }
});



function loop() { 
	var distance = sensor(); 
	if(distance<0) distance = 100; 
	display.showNumber(0,distance,1); 
}
