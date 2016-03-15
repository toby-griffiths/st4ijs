var socket = require('socket.io-client')('http://sebsmac.local:8101'); //TODO change to node.seb.ly


var Gpio = require('pigpio').Gpio,
	led = new Gpio(21, {mode: Gpio.OUTPUT}),
	button = new Gpio(15, {
		mode: Gpio.INPUT,
		pullUpDown: Gpio.PUD_DOWN,
		edge: Gpio.EITHER_EDGE
	}); 

var ledOn = false; 

socket.on('connect', function(){
	
});
socket.on('led', function(data){
	led.digitalWrite(data.value); 
});

socket.on('disconnect', function(){
	
});



button.on('interrupt', function (level) {
	ledOn = level; 
	led.digitalWrite(level);
	socket.emit('led', {value: ledOn});
});
