var Gpio = require('onoff').Gpio; 

var led = new Gpio(21,'out'); 

var interval = setInterval(update, 1000);

function update() { 
	led.writeSync(1-led.readSync()); 
}


function exit() { 
	clearInterval(interval);
	led.unexport(); 
}

process.on('SIGINT', exit);
