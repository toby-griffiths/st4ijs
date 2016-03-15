var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();

var channelId = 97855;
var writeKey = '5FZ53GQ9E7P8ZQIL';
client.attachChannel(channelId, { writeKey:writeKey}, channelAttached);

function channelAttached(err) { 
	console.log("channelAttached", err); 
	update(); 
	
}

function update() { 
	client.updateChannel(channelId, {field1: 7}, dataSent);
}

function dataSent(err) { 
	console.log("dataSent", err); 
	setTimeout(update, 20000); 
}