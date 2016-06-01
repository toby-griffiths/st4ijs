var Gpio = require('pigpio').Gpio; 

// this is how pigpio does inputs. You can optionally add a call back to when it 
// changes, but we're not doing that here. 
var button = new Gpio(23, { mode: Gpio.INPUT });
 
// change these to match your LED GPIO pins : 
var ledPins = [21,20,16,12,26,19,13,6,5]; 
 
var leds = [];

var level = 0; 
 
// initialise all the pins
for (var i = 0; i<ledPins.length; i++) { 
	var led = new Gpio(ledPins[i], {mode: Gpio.OUTPUT});    
	leds.push(led);
	led.digitalWrite(0);
}
 
// get a loop running 60 times a second (1000/60 = 16.6)
setInterval(loop, 16); 
 
function loop() { 
 
	// If the button is pressed, increase the level variable, 
	// which dictates how many LEDs are lit. 

	if(button.digitalRead()) { 
		level+=0.1; 
		if(level>leds.length) level = leds.length; 	
	} else {
		// if the button isn't pressed, decrease level
		level-=0.2;
		if(level<0) level = 0; 
	}
	
	
	for(var i = 0; i<leds.length; i++) { 
 
		var led = leds[i];

		// default LED state is 0, ie off. 
		var brightness = 0;  

		// if we're on the current LED, then fade it, otherwise turn it on
		if(Math.floor(level)==i) brightness = (level-i);  
		else if(level>i) brightness = 1;

		// gamma correction
		brightness *=brightness;
		led.pwmWrite(Math.floor(brightness*255));
	}	
 
}
