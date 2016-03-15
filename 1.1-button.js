var Gpio = require('onoff').Gpio,
  led = new Gpio(21, 'out'),
  button = new Gpio(15, 'in', 'both');

setInterval(update, 1); 

function update() { 
	led.writeSync(button.readSync()); 
}
