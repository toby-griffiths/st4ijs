var socket = require('socket.io/node_modules/socket.io-client')('http://node.seb.ly:8102');

var Gpio = require('pigpio').Gpio,
	led = new Gpio(21, {mode: Gpio.OUTPUT}),
	button = new Gpio(15, {
		mode: Gpio.INPUT,
		pullUpDown: Gpio.PUD_DOWN,
		edge: Gpio.EITHER_EDGE
	}); 

var ledOn = false; 
var room = process.argv[2] || 'defaultroom';

socket.on('connect', function(){
	socket.emit('joinroom', {value:room}); 
});
socket.on('led', function(data){
	console.log('led', data.value);
	led.digitalWrite(data.value); 
});

socket.on('disconnect', function(){
	
});


button.on('interrupt', function (level) {
	ledOn = level; 
	led.digitalWrite(level);
	socket.emit('led', {value: ledOn});
});
