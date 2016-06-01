var socket = require('socket.io/node_modules/socket.io-client')('http://node.seb.ly:8102');
var Lcd = require('lcd'),
	lcd = new Lcd({
		rs:24,
		e: 23,
		data: [22, 27, 17,4 ],
		cols: 16,
		rows: 2
	});

var room = process.argv[2] || 'defaultroom';
var lcdReady = false; 
showMessage('connecting...'); 
	
socket.on('connect', function(){
	socket.emit('joinroom', {value:room}); 
	showMessage('join room '+room); 
});
socket.on('message', function(data){
	console.log('message', data.value);
	showMessage(data.value); 

});

socket.on('disconnect', function(){
	
});

function showMessage(message) { 
	if(!lcdReady) setTimeout(function() {
			showMessage(message); 
		}, 1000); 
	else { 	
		console.log('printing', message);
		lcd.clear();
		lcd.setCursor(0, 0);
		lcd.print(message); 
	}
}

lcd.on('ready', function() {
	lcdReady = true; 
});


// If ctrl+c is hit, free resources and exit.
process.on('SIGINT', function() {
	lcd.clear();
	lcd.close();
	process.exit();
});
