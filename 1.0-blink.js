var Gpio = require('onoff').Gpio; 

var led = new Gpio(21,'out'); 

setInterval(update, 1000);

function update() { 
	led.writeSync(1-led.readSync()); 
}


function exit() { 
	led.unexport(); 
}

process.on('SIGINT', exit);