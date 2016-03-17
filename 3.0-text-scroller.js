
var LedControl = require("rpi-led-control"); 


var lc = new LedControl(11,10,9);
lc.setBrightness(0,15);


var  startTime = Date.now();

setInterval(loop, 1);

var chars = '        Yay! 100 percent readable text! Well maybe not all the characters but it\'s a good effort...'; 

function loop() { 
	lc.clearDisplay(); 
	

	var num = ((Date.now()-startTime)/200)%chars.length<<0; 

	for(var i = 0;i<8; i++) {
		lc.setChar(0,7-i,chars.charAt((num+i)%chars.length), false); 
	}

}


