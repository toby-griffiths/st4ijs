// IP Flash
// used to identify the last part of the Raspberry Pi's IP address. 
// It finds the IP address, and then flashes the LED the number of
// times of that last digit. So if the IP address is 192.168.1.10
// the LED will flash 10 times. 

"use strict";

//import the onoff library, and extract the Gpio object constructor
var Gpio = require('onoff').Gpio;

// import the 'os' library - we need this to get the ip address
var os = require('os');

// make a new Gpio object for pin 21 as an output
var led = new Gpio(21, 'out');      

// now get the network interfaces
var ifaces = os.networkInterfaces();
// an array to store the ip numbers in
var ipNumbers = []; 
// the number of times to flash the ip address
var flashCount = 5; 

Object.keys(ifaces).forEach(function (ifname) {
	var alias = 0;

	ifaces[ifname].forEach(function (iface) {
		if ('IPv4' !== iface.family || iface.internal !== false) {
			// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
			return;
		}

		if (alias >= 1) {
			// this single interface has multiple ipv4 addresses
			console.log("multiple ipv4 addresses"); 
			console.log(ifname + ':' + alias, iface.address);
		} else {
			// this interface has only one ipv4 adress
			console.log("single ipv4 addresses"); 
			console.log(ifname, iface.address);
			console.log(iface);
			ipNumbers = iface.address.split('.');
			startBlink();  
		}
		++alias;
	});
});


function startBlink() { 
	if(flashCount<=0) { 
		led.unexport(); 
	} else {
		flashCount--; 
		blink(ipNumbers[3] * 2); 
	}

}


// Toggle the state of the LED on GPIO #14 every 200ms 'count' times.
// Here asynchronous methods are used. Synchronous methods are also available.



function blink(count) {
  if (count <= 0) {

	setTimeout(startBlink, 1000); 
	return;
    //return led.unexport();
  }

  led.read(function (err, value) { // Asynchronous read.
    if (err) {
      throw err;
    }

    led.write(value ^ 1, function (err) { // Asynchronous write.
      if (err) {
        throw err;
      }
    });
  });

  setTimeout(function () {
    blink(count - 1);
  }, led.readSync()?300:100);
}
