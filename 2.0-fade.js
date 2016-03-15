var Gpio = require('pigpio').Gpio,
  led = new Gpio(21, {mode: Gpio.OUTPUT}),
  lightLevel = 0;

setInterval(update, 20);

function update() { 
	led.pwmWrite(lightLevel);

	lightLevel += 5;
	if (lightLevel > 255) {
		lightLevel = 0;
	}
}