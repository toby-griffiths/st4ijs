var Gpio = require('onoff').Gpio,
  led = new Gpio(21, 'out'),
  button = new Gpio(23, 'in', 'both');

button.watch(function(err, value) {
  led.writeSync(value);
});