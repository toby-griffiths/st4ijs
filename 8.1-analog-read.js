var Mcp3008 = require('mcp3008.js'),
    adc = new Mcp3008(),
    channel = 0, 
    lastRead = -1; ;

adc.poll(channel, 50, function (value) {
	if(value!=lastRead) {  	   
		console.log(value);
		lastRead = value;
	}

});
