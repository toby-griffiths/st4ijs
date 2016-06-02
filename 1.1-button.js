var Gpio = require('onoff').Gpio,
  led = new Gpio(21, 'out'),
  button = new Gpio(23, 'in');

setInterval(update, 1); 

function update() { 
	led.writeSync(button.readSync()); 
}
